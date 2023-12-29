class RegisterUser {
  user_registered_successfully = {
    $schema: "http://json-schema.org/draft-07/schema#",
    title: "Generated schema for Root",
    type: "object",
    properties: {
      success: {
        type: "boolean",
      },
      status: {
        type: "number",
      },
      message: {
        type: "string",
      },
      data: {
        type: "object",
        properties: {
          id: {
            type: "string",
          },
          name: {
            type: "string",
          },
          email: {
            type: "string",
          },
        },
        required: ["id", "name", "email"],
      },
    },
    required: ["success", "status", "message", "data"],
  };
  registration_failed = {
    $schema: "http://json-schema.org/draft-07/schema#",
    title: "Generated schema for Root",
    type: "object",
    properties: {
      success: {
        type: "boolean",
      },
      status: {
        type: "number",
      },
      message: {
        type: "string",
      },
    },
    required: ["success", "status", "message"],
  };
}

module.exports = RegisterUser;
