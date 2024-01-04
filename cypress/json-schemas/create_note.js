class CreateNote {
  created_note_schema = {
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
          title: {
            type: "string",
          },
          description: {
            type: "string",
          },
          category: {
            type: "string",
          },
          completed: {
            type: "boolean",
          },
          created_at: {
            type: "string",
          },
          updated_at: {
            type: "string",
          },
          user_id: {
            type: "string",
          },
        },
        required: [
          "id",
          "title",
          "description",
          "category",
          "completed",
          "created_at",
          "updated_at",
          "user_id",
        ],
      },
    },
    required: ["success", "status", "message", "data"],
  };
  create_note_with_other_category = {
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

module.exports = CreateNote;
