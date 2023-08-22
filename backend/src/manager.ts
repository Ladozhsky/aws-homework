import Addresses from "./accessors";

const addresses = new Addresses();

exports.handler = async (event: any) => {
  let response;
  try {
    switch (true) {
      case event.httpMethod === "GET" && event.path === "/addresses":
        response = await addresses.getall();
        return {
          statusCode: 200,
          body: JSON.stringify(response),
        };
      case event.httpMethod === "GET" && event.path === `/addresses/${event.pathParameters.id}`:
        response = await addresses.getOne(event.pathParameters.id);
        return {
          statusCode: 200,
          body: JSON.stringify(response),
        };
      case event.httpMethod === "POST" && event.path === "/addresses":
        response = await addresses.addOne(JSON.parse(event.body));
        return {
          statusCode: 200,
          body: JSON.stringify(response),
        };
      case event.httpMethod === "PUT" && event.path === `/addresses/${event.pathParameters.id}`:
        response = await addresses.updateOne(
          event.pathParameters.id,
          JSON.parse(event.body)
        );
        return {
          statusCode: 200,
          body: JSON.stringify(response),
        };
      case event.httpMethod === "DELETE" && event.path === `/addresses/${event.pathParameters.id}`:
        response = await addresses.deleteOne(event.pathParameters.id);
        return {
          statusCode: 200,
          body: JSON.stringify(response),
        };
    }
  } catch (error: any) {
    console.log(error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "An error occurred" }),
    };
  }
};
