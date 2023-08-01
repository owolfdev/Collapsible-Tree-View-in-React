export interface NotionData {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: {
    object: string;
    id: string;
  };
  last_edited_by: {
    object: string;
    id: string;
  };
  cover: null;
  icon: null;
  parent: {
    type: string;
    database_id: string;
  };
  archived: boolean;
  properties: {
    Priority: {
      id: string;
      type: string;
      status: {
        id: string;
        name: string;
        color: string;
      };
    };

    Links: {
      id: string;
      type: string;
      rich_text: any[];
    };
    Type: {
      id: string;
      type: string;
      select: {
        id: string;
        name: string;
        color: string;
      };
    };
    "Assigned to": {
      id: string;
      type: string;
      people: any[];
    };
    Supervisor: {
      id: string;
      type: string;
      people: any[];
    };
    "Parent item": {
      id: string;
      type: string;
      relation: {
        id: string;
      }[];
      has_more: boolean;
    };
    Description: {
      id: string;
      type: string;
      rich_text: {
        type: string;
        text: {
          content: string;
          link: null;
        };
        annotations: {
          bold: boolean;
          italic: boolean;
          strikethrough: boolean;
          underline: boolean;
          code: boolean;
          color: string;
        };
        plain_text: string;
        href: null;
      }[];
    };
    Notes: {
      id: string;
      type: string;
      rich_text: any[];
    };
    "Sub-item": {
      id: string;
      type: string;
      relation: {
        id: string;
      }[];
      has_more: boolean;
    };
    Tags: {
      id: string;
      type: string;
      multi_select: any[];
    };
    "Due Date": {
      id: string;
      type: string;
      date: { start: string } | null;
    };
    "Files & media": {
      id: string;
      type: string;
      files: any[];
    };
    Status: {
      id: string;
      type: string;
      status: {
        id: string;
        name: string;
        color: string;
      };
    };
    Name: {
      id: string;
      type: string;
      title: {
        type: string;
        text: {
          content: string;
          link: null;
        };
        annotations: {
          bold: boolean;
          italic: boolean;
          strikethrough: boolean;
          underline: boolean;
          code: boolean;
          color: string;
        };
        plain_text: string;
        href: null;
      }[];
    };
  };
  url: string;
  public_url: null;
}
