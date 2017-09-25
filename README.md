# timber-track

Project developed during the hackathlon organized at the Copenhagen Blockchain Summer School 2017.
The project extends the Truffle Metachain project to support multiple tokens that can be transformed into others.
Tokens represent physical goods that are traded in the timber supply chain.
The transformation rate depends on the actual processing that happens in the supply chain.

## Purpose

The use case is provided by a wood certification company. They need to do volume reconciliation of
wood stocks along the supply chain, to avoid that traders sell uncertified wood as certified.

## Usage

After testrpc is running,
```
truffle compile
truffle deploy
npm run dev &
```

Then the central authority (wood certificator) runs the initialization script

```
nodejs app/javascript/central_authority_controller.js
```

The addresses of the deployed contract should be hard coded in the web interface of the traders.
The web interface is hosted by localhost, is build by webpack and uses Bootstrap.

