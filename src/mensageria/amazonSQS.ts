'use strict';
import AWS from 'aws-sdk';
import { processOrder } from '../handler';
import { Callback, Context, SQSEvent } from 'aws-lambda';

const sqs = new AWS.SQS( {
    region: 'us-east-1',
    accessKeyId : process.env.ACCESSKEYID,
    secretAccessKey : process.env.SECRETKEY,
    sessionToken : process.env.TOKEN
})


const processOrderQueueUrl = process.env.PROCESS_ORDER_QUEUE_URL || 'https://sqs.us-east-1.amazonaws.com/537152494189/criar-pagamento-queue';
const processOrderCreatedQueueUrl = process.env.PROCESS_PAYMENT_CREATED_QUEUE_URL || 'https://sqs.us-east-1.amazonaws.com/537152494189/pagamento-criado-queue';
const processOrderPayQueueUrl = process.env.PROCESS_PAYMENT_CREATED_QUEUE_URL || 'https://sqs.us-east-1.amazonaws.com/537152494189/resultado_pagamento_queue';



export async function  pollQueue() {
    console.log('Escutando a fila SQS na URL:', processOrderQueueUrl);
  
    const params = {
      QueueUrl: processOrderQueueUrl,
      MaxNumberOfMessages: 10, // Número máximo de mensagens para obter por vez
      WaitTimeSeconds: 20, // Tempo de espera longo para otimizar chamadas
    };
  
    try {
      const data = await sqs.receiveMessage(params).promise();
  
      if (data.Messages && data.Messages.length > 0) {
        for (const message of data.Messages) {
          console.log('Mensagem Recebida:', message.Body);


          const context: Context = {} as Context;
          const callback: Callback = () => {};
  
          // Chame sua função de handler localmente
          await processOrder({
            Records: [{ body: message.Body }] as any,
          } as SQSEvent, context, callback);
          await deleteMessage(message);
        }
      }
    } catch (error) {
      console.error('Erro ao processar mensagens da fila:', error);
    }
  
    // Continue escutando a fila
    setTimeout(pollQueue, 5000); // Poll a cada 1 segundo
}
  
export async function sendMessageToQueue(messageBody: string): Promise<void> {
  const params = {
    QueueUrl: processOrderCreatedQueueUrl,
    MessageBody: messageBody,
  };
  try {
    const result = await sqs.sendMessage(params).promise();
    console.log(`Mensagem enviada com sucesso. ID da mensagem: ${result.MessageId}`);
  } catch (error) {
    console.error('Erro ao enviar a mensagem:', error);
  }
}

export async function sendMessageToQueuePay(messageBody: string): Promise<void> {
  const params = {
    QueueUrl: processOrderPayQueueUrl,
    MessageBody: messageBody,
  };
  try {
    const result = await sqs.sendMessage(params).promise();
    console.log(`Mensagem enviada com sucesso. ID da mensagem: ${result.MessageId}`);
  } catch (error) {
    console.error('Erro ao enviar a mensagem:', error);
  }
}

async function deleteMessage(message: AWS.SQS.Message) {
  try {
    if (message.ReceiptHandle) {
      const deleteParams = {
        QueueUrl: processOrderQueueUrl,
        ReceiptHandle: message.ReceiptHandle, // Identificador único para deletar a mensagem
      };
      // Deletando a mensagem após o processamento
      await sqs.deleteMessage(deleteParams).promise();
      console.log('Mensagem deletada com sucesso:', message.ReceiptHandle);
   } 
  } catch (deleteError) {
    console.error('Erro ao deletar a mensagem:', deleteError);
  }
}
