# Domain Hunter HQ

Choosing the right business name is challenging, especially when many desirable names are already taken. Our project utilizes WhoisXML API's tools to access global domain registration data, allowing users to quickly check if their desired business name is available and who currently owns it.

## User Story

```
AS A business owner
I WANT to see if a domain name is available
SO THAT I can register for it
```

## Acceptance Criteria

```
GIVEN a domain checker with form inputs

1. WHEN I enter a domain name to search
THEN I am presented whether the domain name is available or taken.

2. WHEN a domain is taken
THEN I am presented with how old the domain is and its registered owner's contact info.
```

## Wireframe or Sketch of the Design

![domain-hunter-hq](https://github.com/girlnotfound/Domain-Hunter-HQ/assets/30459021/e73c0d67-ab9f-4970-a9d3-230d094c6432)


## APIs to be used

1. [Name Checker API](https://domain-availability.whoisxmlapi.com/api)
2. [Registration Checker API](https://whois.whoisxmlapi.com/)

## Rough Breakdown of Tasks

1. Search domain name for availability.
2. If domain name has been taken, present its current owner's contact info.

&copy; 2024 - Domain Hunter HQ.
