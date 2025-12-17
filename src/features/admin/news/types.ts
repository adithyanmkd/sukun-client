/* *
 * Represents the exact shape of the News object
 * as sent by the server (API response DTO).
 * DTO = Data Transfer Object
 */
export interface NewsDto {
  _id: string;
  title: string;
  description: string;
  category: {
    categoryId: string;
    name: string;
  };
  source: {
    sourceId: string;
    name: string;
  };
  readMoreUrl: string;
  image: {
    public_id: string;
    url: string;
  };
}
