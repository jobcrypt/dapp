// import ethers from 'ethers';

export const isNull = (value) =>{
    if(value === undefined)return true;
    if(value === null)return true;
    if(value.length <= 0)return true;

    return false;
}

export const networks = {
    sepolia: {
        chainId: `0x${Number(11155111).toString(16)}`, // A 0x-prefixed hexadecimal string
        chainName: `Sepolia Testnet`,
      nativeCurrency: {
        name: `Sepolia`,
        symbol: `SepoliaETH`, // 2-6 characters long
        decimals: 18,
      },
      rpcUrls: [
        'https://rpc.sepolia.org',
        'https://rpc2.sepolia.org',
        'https://rpc-sepolia.rockx.com',
        'https://eth-sepolia.g.alchemy.com/v2/demo'
    ],
      blockExplorerUrls: ['https://sepolia.etherscan.io/'],
      iconUrls:[], // Currently ignored.
    },
    optimism: {
        chainId: `0x${Number(10).toString(16)}`, // A 0x-prefixed hexadecimal string
        chainName: `Optimism`,
        id: 10,
      nativeCurrency: {
        name: `ETH`,
        symbol: `ETH`, // 2-6 characters long
        decimals: 18,
      },
      rpcUrls: [
        'https://mainnet.optimism.io',
        'https://opt-mainnet.g.alchemy.com/v2/demo',
        'https://optimism.blockpi.network/v1/rpc/public',
        'https://rpc.ankr.com/optimism',
        'https://optimism-mainnet.public.blastapi.io'
    ],
      blockExplorerUrls: ['https://optimistic.etherscan.io'],
      iconUrls:[], // Currently ignored.
    }
}