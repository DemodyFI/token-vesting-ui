import contract from "@truffle/contract";
import Network from "./network";

export async function getTokenVesting(address) {
  const TokenVesting = contract(require("./TokenVesting.json"));
  const provider = await Network.provider();
  TokenVesting.setProvider(provider);
  return TokenVesting.at(address);
}

export async function getSimpleToken(address) {
  const SimpleToken = contract(require("./ERC20.json"));
  const provider = await Network.provider();
  SimpleToken.setProvider(provider);
  return SimpleToken.at(address);
}

export async function getDmodCrowdsale(address) {
  const DMODCrowdsale = contract(require("./DMODCrowdsale.json"));
  const provider = await Network.provider();
  DMODCrowdsale.setProvider(provider);
  return DMODCrowdsale.at(address);
}

export async function getAggregatorV3(address) {
  const AggregatorV3Interface = contract(
    require("./AggregatorV3Interface.json")
  );
  const provider = await Network.provider();
  AggregatorV3Interface.setProvider(provider);
  return AggregatorV3Interface.at(address);
}
