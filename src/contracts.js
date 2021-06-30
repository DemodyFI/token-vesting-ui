import contract from "@truffle/contract";
import Network from "./network";

export async function getTokenVesting(address) {
  const TokenVesting = contract(require("./TokenVesting.json"));
  const provider = await Network.provider();
  TokenVesting.setProvider(provider);
  return TokenVesting.at(address);
}

export async function getPublicTokenVesting1() {
  const TokenVesting = contract({
    abi: require("./airdrop.json"),
  });
  const provider = await Network.provider();
  TokenVesting.setProvider(provider);
  return TokenVesting.at("0x64C19b7191Be0055E8f1ce1fabB32Cf52695aB61");
}

export async function getPublicTokenVesting2() {
  const TokenVesting = contract(require("./airdrop.json"));
  const provider = await Network.provider();
  TokenVesting.setProvider(provider);
  return TokenVesting.at("0x64C19b7191Be0055E8f1ce1fabB32Cf52695aB61");
}

export async function getSimpleToken(address) {
  const SimpleToken = contract(require("./SimpleToken.json"));
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
