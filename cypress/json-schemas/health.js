class Health {
  schema = {
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

module.exports = Health;
