#ifndef HTTPRESPONSE_H_   /* Include guard */
#define HTTPRESPONSE_H_

#include <ESP8266WiFi.h>

#include <string.h>
#include "EEPROMAnything.h"
#include "Parsers.h"

#define HTTP_REQUEST_LINE   "HTTP/1.1 "
const String HTTP_CONTENT_TYPE =  "Content-Type: text/html";
const String HTTP_CONTENT_LENGTH = "Content-Length:";

const String HTTPRequestLineCode[] = {
  "200 OK",
  "400 BAD_REQUEST",
  "401 UNAUTHORIZED",
  "403 FORBIDDEN",
  "404 NOT_FOUND",
  "500 INTERNAL_SERVER_ERROR"
};

typedef enum HTTPResponseType_t {
  OK_200,
  BAD_REQUEST_400,
  UNAUTHORIZED_401,
  FORBIDDEN_403,
  NOT_FOUND_404,
  INTERNAL_SERVER_ERROR_500
};

void HTTPSendResponse (WiFiClient cli, HTTPResponseType_t responseType, String content)
{
  // Prepare the response
  String s = HTTP_REQUEST_LINE + HTTPRequestLineCode[responseType];
  s += "\n" + HTTP_CONTENT_TYPE;
  s += "\n" + HTTP_CONTENT_LENGTH + " " + (sizeof(content1)+1);
  s += "\r\n\r\n" + content;
  
  cli.print(s);
  delay(1);
}

#endif // HTTPRESPONSE_H_

