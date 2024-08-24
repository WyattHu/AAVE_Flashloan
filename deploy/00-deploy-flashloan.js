const { network } = require("hardhat");
const {
    networkconfig,
    developmentChains,
} = require("../hardhat-config-helper");
require("dotenv").config();
const { verify } = require("../utility/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId;
    let FlashLoan;
    log('chainId:' + chainId)
    log(deployer)
    log("Deploying FlashLoan Contract...");

    FlashLoan = await deploy("FlashLoan", {
        contract: "FlashLoan",
        from: deployer,
        log: true,
        args: ['0x012bAC54348C0E635dCAc9D5FB99f06F24136C9A'],
        waitConfirmations: network.config.blockConfirmations || 1,
    });


    log("------------------------------------------------");
    log(`FlashLoan deployed at ${FlashLoan.address}`);

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(FlashLoan.address, [process.env.DATAFEED_ETHUSD]);
    }
};
module.exports.tags = ["all", "FlashLoan"];
