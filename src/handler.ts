'use strict';
import Payment from "./entity/payment";
import { PaymentUseCase } from "./useCase/paymentUseCase";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { connect } from "mongoose";
const mongoUrl = process.env.MONGO_URI ?? '';

(async () => {
  await connect(mongoUrl);
})();

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
              statusCode: 200,
              body: JSON.stringify(result),
          };
    }else{
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Corpo da solicitação não fornecido' + " Event Headers: " + event.headers + " Event Data: " + event.pathParameters + " Event body: " + event.body  }),
      };
    }
  } catch (error : any) {
    console.log(event.body);
    return {
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
              statusCode: 200,
              body: JSON.stringify(result),
          };
    }else{
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Corpo da solicitação não fornecido' + " Event Headers: " + event.headers + " Event Data: " + event.pathParameters + " Event body: " + event.body  }),
      };
    }
  } catch (error : any) {
    console.log(event.body);
    return {
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
          return {
              statusCode: 200,
              body: JSON.stringify(result),
          };
    }else{
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Corpo da solicitação não fornecido' + " Event Headers: " + event.headers + " Event Data: " + event.pathParameters + " Event body: " + event.body  }),
      };
    }
  } catch (error : any) {
    console.log(event.body);
    return {
      statusCode: 500,
      body: JSON.stringify({ erro: error.message + " " + event }),
    };
  }
};