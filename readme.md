# Tetsudo Eki Anime Dashboard

## Starting Development

- skaffold dev

## Kubernetes Prod/dev Setup

- Cert Manager
- Ingress Ngnix
- setup jwt-secret for process.env.JWT_KEY to run properly
- setup client-baseurl as BASE_URL to run properly
- kubectl create secret generic jwt-secret --from-literal=JWT_KEY=(insert key)
-
- if using this as a template, change NATS_CLUSTER_ID in .depl files

## kubernetes problems I run into

- if restarting kubernetes, need to start two below
- ingress-nginx not being started
- secrets not defined

## Create a new microservice

- look at k8s and cp paste a depl/mongo-depl
- cp .json and Dockerfiles from other service(ex: tickets), update package.json
- cp app.ts, index.ts, nats-wrapper.ts from another service
- maybe cp test folder, **mocks** folder
- docker build, push, and update skaffold.yaml
- update ingress path if needed
- create basic routes
- create mongodb model schema
- write jest tests
