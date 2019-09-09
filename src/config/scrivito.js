import * as Scrivito from "scrivito";

const config = { tenant: process.env.SCRIVITO_TENANT };

if (process.env.SCRIVITO_ORIGIN) {
  config.origin = process.env.SCRIVITO_ORIGIN;
}

Scrivito.configure({
  ...config,
  endpoint: "beta-api.scrivito.com",
  unstable: {
    // assetUrlBase: "http://localhost:8090/scrivito",
    trustedUiOrigins: ["https://the-cloud-ui.netlify.com"],
  },
});
