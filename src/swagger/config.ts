import { DocumentBuilder } from "@nestjs/swagger";

export const config = new DocumentBuilder()
  .setTitle("Phonebook REST API Specification")
  .setExternalDoc("Pavlo Levchenko", "https://github.com/PavloLevchenko")
  .setVersion(process.env.npm_package_version || "1.0")
  .addBearerAuth()
  .addTag("users")
  .addTag("contacts")
  .build();
