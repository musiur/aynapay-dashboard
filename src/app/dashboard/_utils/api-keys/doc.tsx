const Documentation = () => {
  return (
    <div className="py-8 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-bold mb-6">
          Payment Gateway Integration Guide
        </h1>

        <section className="mb-6">
          <h2 className="text-md font-semibold mb-2">Overview</h2>
          <p>
            Welcome to the Catopay payment gateway integration guide. This guide
            will help you integrate our payment gateway into your platform. The
            steps we have to follow are below here
          </p>
          <ul className="list-decimal pl-4">
            <li>Prepare your Catopay API key from Dashboard</li>
            <li>In your application fetch all the payment methods</li>
            <li>Create a payment request</li>
            <li>Handle response and payment callbacks</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-md font-semibold mb-2">
            1. Prepare your Catopay API key from Dashboard
          </h2>
          <p>
            In dashboard go to <b>Api Keys</b> tab and get your API by clicing
            on generate and use that for further use cases.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-md font-semibold mb-2">
            2. In your application fetch all the payment methods
          </h2>
          <pre className="bg-gray-200 p-4 rounded-md mt-2">
            <code>
              {`
/**
 * In NextJS v14 using Server Action
 * __TYPESCRIPT__
 * / 
 
export const A__GET__PaymentMethods = async () => {
    try {
        if (!APIKEY) {
            return {
                success: false,
                message: "API Key is not provided."
            }
        }
        const response = await fetch("https://api.catopay.com/api/v1/payment/methods", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": APIKEY
            },
            cache: "no-store"
        })
        const result = await response.json();
        return result;
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong!"
        }
    }
}
                
                `}
            </code>
          </pre>
        </section>

        <section className="mb-6">
          <h2 className="text-md font-semibold mb-2">
            3. Create a payment request
          </h2>
          <p>
            Use the following endpoint to create a payment request:
            <code className="block bg-gray-200 p-2 mt-2 rounded-md">
              POST https://api.catopay.com/api/v1/payment/create
            </code>
          </p>
          <p>Here is an example of a POST request to create a payment:</p>
          <pre className="bg-gray-200 p-4 rounded-md mt-2">
            <code className="break-words">
              {`
/**
 * In NextJS v14 using Server Action
 * __TYPESCRIPT__
 * /            
const CreatePaymentAction = async (data: any) => {           
    try{
        const response = await fetch("https://api.catopay.com/api/v1/payment/create", {
              "method": "POST",
              "Content-Type": "application/json",
              "x-api-key": "__your__api__key__" //e.g public-3Wb-jFc8dULL7EaW-3jX
              "body": JSON.stringify({
                "amount": 100,
                "description": "Payment for services",
                "redirect_url": "https://your-domain/payment_endpoint",
                "callback_url": "__your__callback__endpoint__",
                "paymentMethodId": "__select__from__fetched__payment__methods__"
              })
        })
              
        const result = await response.json();
        return result;
    }catch(error){
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}



Your fetch configuration could be like this: 

        {
          "method": "POST",
          "Content-Type": "application/json",
          "x-api-key": "__your__api__key__" //e.g public-3Wb-jFc8dULL7EaW-3jX
          "body": JSON.stringify({
            "amount": 100,
            "description": "Payment for services",
            "redirect_url": "https://your-domain/payment_endpoint",
            "callback_url": "___your__api__endpoint___" // callback url trigger
            function should have POST fetch/http_request
          })
        }

        * Method: HTTP methods
        * x-api-key: API key provided by Catopay from your dashboard
        * body: here the body is a Javascript object.
          We expect to have a JSON strigified body/payload/request_body
          - amount: amount you want to get as a payment from customers
          - description: (Optional) description of the payment
          - redirect_url: URL where customers will be redirected after successful payment.
           This URL should be registered in your Catopay dashboard.
          - callback_url: URL which is a API endpoint from your application that will
           get the confirmation of a payment in Catopay after successful payment.
           Later on we will add a field in dashboard to add the call back url
           from there. Expected release version will be v2.0.0

           
`}
            </code>
          </pre>
        </section>

        <section className="mb-6">
          <h2 className="text-md font-semibold mb-2">
            4. Handle response and payment callbacks
          </h2>
          <p>Here is an example of a successful response:</p>
          <pre className="bg-gray-200 p-4 rounded-md mt-2">
            <code>
              {`
{
  "success": true,
  "message": "Payment request created successfully",
  "data": {
    "id": "66822784c1eb5b347af85014",
    "senderUID": "6663117280ab765a5be9994a",
    "receiverUID": "6663117280ab765a5be9994a",
    "amount": 100,
    "exchangeRate": 1,
    "transactionSource": "",
    "senderTransactionId": "",
    "paymentMethodId": "667c6a8ba2e6248b11a37b61",
    "paymentMethodTitle": "Rocket",
    "paymentMethodNumberOrAddress": "+8801323260714",
    "status": "Pending",
    "transactionType": "Payment",
    "note": "Optional note",
    "createdAt": "2024-07-01T03:50:28.193Z",
    "updatedAt": "2024-07-01T03:50:28.193Z"
  },
  "statusCode": 200
}`}
            </code>
          </pre>

          <p className="max-w-md">
            After creating a payment method we have to be on with{" "}
            <b>requestId from the response of payment creation `response.id`</b>{" "}
            Catopay UI .In their customer will submit transaction information
            and payment request will be notified to receivers.{" "}
            <b>
              After acceptance from receiver Catopay will trigger the redirect
              callback api endpoint function of your application to inform your
              platform about successfull payment status.
            </b>
          </p>
          <pre className="bg-gray-200 p-4 rounded-md mt-2">
            <code>
              {`
window.location.href = "https://pay.catopay.com/payment?requestId=66822784c1eb5b347af85014";

this requestId in url is actually from

response.data.id = "66822784c1eb5b347af85014"
is response example  
                  `}
            </code>
          </pre>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Integration in Next.js</h2>
          <p className="max-w-md">
            Here is an example of how to integrate the payment gateway in a
            Next.js application:
          </p>
          <pre className="bg-gray-200 p-4 rounded-md mt-2">
            <code>
              {`
  async function onSubmit(values: z.infer<typeof FormSchema>) {
  const result = await A_POST_PaymentTransactionInfo({
    ...values,
  });
  ResponseX({ title: "Payment", result });

  // after successfully payment creation redirect to CATOPAY UI
  if (typeof window !== "undefined" 
  && result?.data?.id 
  && result?.data?.redirect_url) {
    window.location.href = "https://pay.catopay.com/payment?requestId=__result.data.id__"
  }
}`}
            </code>
          </pre>
        </section>
        <section className="mb-6 space-y-4 max-w-md">
          <h2 className="text-md font-semibold mb-2">
            After successfull payment creation:
          </h2>
          <p className="[&>span]:underline">
            After successfull payment creation we will have an ID in response.
            We can see in the above code snippet that we have PAYMENT ID in so
            called <span>result.data.id</span> and getting other{" "}
            <span>key-values</span> from <span>result.data</span> make a
            redirect url like above where we have{" "}
            <span>window.location.href</span>
          </p>
          <p>
            Using this redirection we will land to CATOPAY UI and there all the
            process of transaction will happend e.g submitting transaction info
            and then from there we will be redirected to our website again with
            some query paramenters related to payment application. And finally
            when the payment will be compeleted then using your callback_url
            basically your API endpoint we will send confirmation that the
            payment is completed!
          </p>
          <p>Thank you.</p>
        </section>
      </div>
    </div>
  );
};

export default Documentation;
