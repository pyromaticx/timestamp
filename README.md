#Timestamp Microservice api

###Accepts a string date like 'january 1 2016' and returns:

`{"unix":1451635200000,"natural":"Friday, January 1, 2016"}`


Will pull the first date it identifies out of a string of any length. Will also accept any number larger than 13 digits
but will only return a value for the first 13 digits:

```
/the date is march 3 2016
```

returns:

```
{"unix":1425369600000,"natural":"Tuesday, March 3, 2016"}
```
