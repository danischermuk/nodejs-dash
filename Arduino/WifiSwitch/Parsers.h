#ifndef PARSERS_H_   /* Include guard */
#define PARSERS_H_

#include <Arduino.h>
#include <string.h>

#define toNumber(x) (x - '0')

int SkipSpacesAtIndex (String str, int index)
{
  while (str.charAt(index) == ' ')
    index++;
  return index;
}


int ParseIntFromStringAtIndex (String str, int index)
{
  int number = 0;
  // Sacar los espacios antes del numero
  index = SkipSpacesAtIndex(str, index);
  // Parsear los numeros que aparezcan a continuacion
  while (isdigit(str.charAt(index)))
    number = number*10 + toNumber(str.charAt(index++));
  return number;
}

String ParseContent (String str)
{
  int index = 0;
  int contentLength = 0;
  String content = "";
  // Es un POST, necesito ver el contenido
  // TODO: Hacer el debido manejo de API y la respuesta
  index = str.indexOf("Content-Length:");
  if (index != -1)
  {
    index += sizeof("Content-Lemgth:");
    contentLength = ParseIntFromStringAtIndex(str, index);
    if(contentLength != 0)
    {
      index = str.indexOf("\r\n\r\n");
      if (index != -1)
      {
        index += sizeof("\r\n\r\n");
        content = str.substring(index, index + contentLength);
      }
    }

  }
  return content;  
}

#endif // PARSERS_H_

