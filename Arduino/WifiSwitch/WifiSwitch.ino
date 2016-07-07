
/*
 *  This sketch demonstrates how to set up a simple HTTP-like server.
 *  The server will set a GPIO pin depending on the request
 *    http://server_ip/gpio/0 will set the GPIO2 low,
 *    http://server_ip/gpio/1 will set the GPIO2 high
 *  server_ip is the IP address of the ESP8266 module, will be 
 *  printed to Serial when the module is connected.
 */

#include <ESP8266WiFi.h>
#include <EEPROM.h>
#include <string.h>
#include "EEPROMAnything.h"
#include "CRC.h"
#include "GeneralConfig.h"
#include "Parsers.h"
#include "HTTPResponse.h"
#include "WifiSwitchAPI.h"

// #define DEBUG 1
#define MEDIR_TIEMPOS 1
// Create an instance of the server
// specify the port to listen on as an argument
WiFiServer server(80);

#ifdef MEDIR_TIEMPOS
long tiempo=0;
#endif

void setup() {
#ifdef MEDIR_TIEMPOS
  tiempo=millis();
#endif
  Serial.begin(115200);
  delay(10);
#ifdef MEDIR_TIEMPOS
  Serial.print("Serial.Begin: ");
  Serial.println(millis()-tiempo);
#endif


#ifdef MEDIR_TIEMPOS
  tiempo=millis();
#endif
  EEPROM.begin(512);
#ifdef MEDIR_TIEMPOS
  Serial.print("EEPROM.Begin: ");
  Serial.println(millis()-tiempo);
#endif  
  // prepare GPIO2
  pinMode(2, OUTPUT);
  digitalWrite(2, 0);
  
  // Verificando la configuración de EEPROM
#ifdef MEDIR_TIEMPOS
  tiempo=millis();
#endif
  EEPROM_readAnything(GENERALCONFIG_EEPROM_ADDR, GeneralConfig);
  int GeneralConfigCrc = crc((byte*)&GeneralConfig, sizeof(GeneralConfig) - sizeof(GeneralConfig.crc));
  if (GeneralConfigCrc == GeneralConfig.crc){
    Serial.println("Configuracion leida exitosamente");
  }
  else
  {
    Serial.println("Error al leer la configuracion. Cargando defaults...");
    GeneralConfig_LoadDefaults();
  }
#ifdef MEDIR_TIEMPOS
  Serial.print("GeneralConfig Load: ");
  Serial.println(millis()-tiempo);
#endif
#ifdef DEBUG
  // Para hacer modificaciones en el GeneralConfig a la fuerza
  GeneralConfig_LoadDefaults();
#endif

  // Connect to WiFi network
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(GeneralConfig.WifiConfig.ssid);

  // Verifico la configuracion de la IP
#ifdef MEDIR_TIEMPOS
  tiempo=millis();
#endif
  if (GeneralConfig.WifiConfig.dhcp == false)
  {
   WiFi.config(GeneralConfig.WifiConfig.ip, GeneralConfig.WifiConfig.gateway, GeneralConfig.WifiConfig.subnet); 
  }
#ifdef MEDIR_TIEMPOS
  Serial.print("WiFi.Config: ");
  Serial.println(millis()-tiempo);
#endif
#ifdef MEDIR_TIEMPOS
  tiempo=millis();
#endif
  WiFi.begin(GeneralConfig.WifiConfig.ssid, GeneralConfig.WifiConfig.pass);
#ifdef MEDIR_TIEMPOS
  Serial.print("WiFi.Begin: ");
  Serial.println(millis()-tiempo);
#endif
#ifdef MEDIR_TIEMPOS
  tiempo=millis();
#endif
  while (WiFi.status() != WL_CONNECTED) {
    delay(100);
    Serial.print(".");
  }
#ifdef MEDIR_TIEMPOS
  Serial.print("WiFi.Status: ");
  Serial.println(millis()-tiempo);
#endif
  Serial.println("");
  Serial.println("WiFi connected");

  // Start the server
#ifdef MEDIR_TIEMPOS
  tiempo=millis();
#endif
  server.begin();
#ifdef MEDIR_TIEMPOS
  Serial.print("Server.Begin: ");
  Serial.println(millis()-tiempo);
#endif
  Serial.println("Server started");
  // Print the IP address
  Serial.println(WiFi.localIP());
}

void loop() {
  // Check if a client has connected
#ifdef MEDIR_TIEMPOS
  tiempo=millis();
#endif
  WiFiClient client = server.available();
  if (!client) {
    return;
  }
#ifdef MEDIR_TIEMPOS
  Serial.print("WiFiClient.Available: ");
  Serial.println(millis()-tiempo);
#endif

  // Wait until the client sends some data
  Serial.println("new client");
  while(!client.available()){
    delay(1);
  }
#ifdef MEDIR_TIEMPOS
  tiempo=millis();
#endif
  APIHandle(&client);
#ifdef MEDIR_TIEMPOS
  Serial.print("APIHandle: ");
  Serial.println(millis()-tiempo);
#endif
  client.flush();
  Serial.println("Client disonnected");

  // The client will actually be disconnected 
  // when the function returns and 'client' object is detroyed
}

