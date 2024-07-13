'use strict';
import Payment from "./entity/payment";
import { PaymentUseCase } from "./useCase/paymentUseCase";
import { APIGatewayProxyEvent, APIGatewayProxyResult, SQSEvent, SQSHandler } from "aws-lambda";
import { connect } from "mongoose";
import AWS  from 'aws-sdk';
import { pollQueue, sendMessageToQueue, sendMessageToQueuePay } from "./mensageria/amazonSQS";
const mongoUrl = process.env.MONGO_URI ?? '';

(async () => {
  await connect(mongoUrl);

})();

if (process.env.IS_OFFLINE) {
  console.log('Rodando com serverless-offline. Iniciando o polling da fila SQS...');

  (async () => {
    try {
     await pollQueue();
    } catch (error) {
      console.error('Erro ao iniciar o polling da fila:', error);
    }
  })();
}

export const generatepayment = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  try {
    if (event.body !== undefined && event.body !== null) { 
          console.log(mongoUrl);
          //await connect(mongoUrl);
    
          const paymentUseCase = new PaymentUseCase();
          const { orderId, price } = JSON.parse(event.body);
          const payment = new Payment(orderId, price); 
    
          const result = await paymentUseCase.generatePayment(payment); 
    
          return {
            headers: {
              'Content-Type': 'application/json',
              'X-Content-Type-Options': 'nosniff' // Adicionando o cabeçalho X-Content-Type-Options
            },
            statusCode: 200,
            body: JSON.stringify(result),
          };
    }else{
      return {
        headers: {
          'Content-Type': 'application/json',
          'X-Content-Type-Options': 'nosniff' // Adicionando o cabeçalho X-Content-Type-Options
        },
        statusCode: 400,
        body: JSON.stringify({ error: 'Corpo da solicitação não fornecido' + " Event Headers: " + event.headers + " Event Data: " + event.pathParameters + " Event body: " + event.body  }),
      };
    }
  } catch (error : any) {
    console.log(event.body);
    return {
      headers: {
        'Content-Type': 'application/json',
        'X-Content-Type-Options': 'nosniff' // Adicionando o cabeçalho X-Content-Type-Options
      },
      statusCode: 500,
      body: JSON.stringify({ erro: error.message + " " + event }),
    };
  }
};

export const searchPaymentByOrderId = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  try {
    if (event.pathParameters !== undefined && event.pathParameters !== null) { 
          console.log(mongoUrl);

          const { orderId } = event.pathParameters as {
            orderId: string
          };
          const paymentUseCase = new PaymentUseCase();
          const result = await paymentUseCase.searchPaymentByOrderId(orderId); 
          return {
              headers: {
                'Content-Type': 'application/json',
                'X-Content-Type-Options': 'nosniff' // Adicionando o cabeçalho X-Content-Type-Options
              },
              statusCode: 200,
              body: JSON.stringify(result),
          };
    }else{
      return {
        headers: {
          'Content-Type': 'application/json',
          'X-Content-Type-Options': 'nosniff' // Adicionando o cabeçalho X-Content-Type-Options
        },
        statusCode: 400,
        body: JSON.stringify({ error: 'Corpo da solicitação não fornecido' + " Event Headers: " + event.headers + " Event Data: " + event.pathParameters + " Event body: " + event.body  }),
      };
    }
  } catch (error : any) {
    console.log(event.body);
    return {
      headers: {
        'Content-Type': 'application/json',
        'X-Content-Type-Options': 'nosniff' // Adicionando o cabeçalho X-Content-Type-Options
      },
      statusCode: 500,
      body: JSON.stringify({ erro: error.message + " " + event }),
    };
  }
};

export const payOrderId = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (event.pathParameters !== undefined && event.pathParameters !== null) { 
          const { orderId } = event.pathParameters as {
            orderId: string
          };

          const paymentUseCase = new PaymentUseCase();
          const result = await paymentUseCase.payOrderId(orderId); 
          await sendMessageToQueuePay(JSON.stringify(result));
          return {
              statusCode: 200,
              body: JSON.stringify(result),
          };
    }else{
      return {
        headers: {
          'Content-Type': 'application/json',
          'X-Content-Type-Options': 'nosniff' // Adicionando o cabeçalho X-Content-Type-Options
        },
        statusCode: 400,
        body: JSON.stringify({ error: 'Corpo da solicitação não fornecido' + " Event Headers: " + event.headers + " Event Data: " + event.pathParameters + " Event body: " + event.body  }),
      };
    }
  } catch (error : any) {
    console.log(event.body);
    return {
      headers: {
        'Content-Type': 'application/json',
        'X-Content-Type-Options': 'nosniff' // Adicionando o cabeçalho X-Content-Type-Options
      },
      statusCode: 500,
      body: JSON.stringify({ erro: error.message + " " + event }),
    };
  }
};

export const processOrder: SQSHandler = async (event: SQSEvent) => {
  for (const record of event.Records) {
    console.log('Mensagem: ', record.body);
    const order = JSON.parse(record.body);
    console.log('Processando Pedido:', order);

    try {
      // Lógica para processar o pedido

      const paymentUseCase = new PaymentUseCase();
      const { orderId, price } = JSON.parse(record.body);
      const payment = new Payment(orderId, price); 

      const result = await paymentUseCase.generatePayment(payment); 

      // Chame sua função de handler localmente
      await sendMessageToQueue(JSON.stringify(result));
    
        
    } catch (error) {
      console.error('Falha ao processar o pedido:', error);
      // Lógica de compensação pode ser implementada aqui
    }
  }
};