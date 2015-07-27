/* Portmaps
Test LED :13

PWM 1 : 9
PWM 2 : 10
PMW 3 : 11
*/

int test_led = 13;
int pwm_1 = 5;
int pwm_2 = 9;
int pwm_3 = 6;

int global_delay = 1000;
char msg = 0;

void setup()
{
 Serial.begin(9600);
 
 pinMode(test_led, OUTPUT);
 pinMode(pwm_1, OUTPUT);
 pinMode(pwm_2, OUTPUT);
 pinMode(pwm_3, OUTPUT);
}

void loop()
{
  /* Protocol
  w : #1 pump (water sampling)
  s : #2 pump (test chemical in)
  d : #3 pump (purge)
  */
  digitalWrite(test_led,HIGH);
  
  if(Serial.available() > 0)
  {
   msg = Serial.read(); 
  if(msg == 'w') //w
  { 
    Serial.print(msg);
    analogWrite(pwm_1,250);
    delay(global_delay);
    analogWrite(pwm_1,0);
   }
         
   if(msg == 's') //s 
   { 
     Serial.print(msg);
     analogWrite(pwm_2,250);
     delay(global_delay);
     analogWrite(pwm_2,0);
    }
     
    if(msg == 'd') //d
    {
      Serial.print(msg);
      analogWrite(pwm_3,250);
      delay(global_delay);
      analogWrite(pwm_3,0);
    }
  }
  
  digitalWrite(test_led,LOW);
  delay(100);
}
