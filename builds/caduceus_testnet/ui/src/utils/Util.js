// import ethers from 'ethers';

// export const REGISTRY_ADDRESS = '0xEfdeAC0C0778DED8eA0a72be3D93258F44Ff9627';//sepolia testnet registry
export const REGISTRY_ADDRESS ='0xB4fCA8053D2b447Be0ab99EF2c7ECAf1f5372f2B'//caduceus testnet registry
export const isNull = (value) =>{
    if(value === undefined)return true;
    if(value === null)return true;
    if(value.length === 0)return true;

    return false;
}
 
// export const chain = {};
// chain.chainId = `0x${Number(11155111).toString(16)}`;
// chain.name = 'Sepolia test network';
// chain.id =  11155111;
// let nativeCurrency = {}; 
// nativeCurrency.name = 'SepoliaETH';
// nativeCurrency.decimals = 18;
// nativeCurrency.symbol = 'SepoliaETH';
// chain.nativeCurrency = nativeCurrency; 
// chain.rpcUrls = [
//   'https://sepolia.infura.io/v3/',
//   'https://rpc.sepolia.org',
//   'https://rpc2.sepolia.org',
//   'https://rpc-sepolia.rockx.com',
//   'https://eth-sepolia.g.alchemy.com/v2/demo'
// ]
// chain.blockExplorerUrls = ['https://sepolia.etherscan.io'];


export const chain = {};
chain.chainId = `0x${Number(512512).toString(16)}`;
chain.chainName = 'Caduceus Testnet';
// chain.id =  512512;
let nativeCurrency = {}; 
nativeCurrency.name = 'CMP';
nativeCurrency.decimals = 18;
nativeCurrency.symbol = 'CMP';
chain.nativeCurrency = nativeCurrency; 
chain.rpcUrls = [
  'https://galaxy.block.caduceus.foundation',
]
chain.blockExplorerUrls = ['https://galaxy.scan.caduceus.foundation'];









// export const chainId = `0x${Number(11155111).toString(16)}`;
// export const id = 11155111;
// export const chainName = `Sepolia Testnet`;
// export const nativeCurrency = {
//   name: 'Sepolia',
//   symbol: 'SepoliaETH',
//   decimals: 18
// }
// export const rpcUrls = [
//   'https://sepolia.infura.io/v3/',
//   'https://rpc.sepolia.org',
//   'https://rpc2.sepolia.org',
//   'https://rpc-sepolia.rockx.com',
//   'https://eth-sepolia.g.alchemy.com/v2/demo'
// ]
// export const blockExplorerUrls= [
//   'https://sepolia.etherscan.io/'
// ];

// export const networks = {
//     sepolia: {
//         chainId: `0x${Number(11155111).toString(16)}`, // A 0x-prefixed hexadecimal string
//         name: `Sepolia test network`,
//       nativeCurrency: {
//         name: `Sepolia`,
//         symbol: `SepoliaETH`, // 2-6 characters long
//         decimals: 18,
//       },
//       rpcUrls: [
//         'https://sepolia.infura.io/v3/',
//         'https://rpc.sepolia.org',
//         'https://rpc2.sepolia.org',
//         'https://rpc-sepolia.rockx.com',
//         'https://eth-sepolia.g.alchemy.com/v2/demo'
//     ],
//       blockExplorerUrls: ['https://sepolia.etherscan.io/'],
//       iconUrls:[], // Currently ignored.
//     },
//     optimism: {
//         chainId: `0x${Number(10).toString(16)}`, // A 0x-prefixed hexadecimal string
//         chainName: `Optimism`,
//         id: 10,
//       nativeCurrency: {
//         name: `ETH`,
//         symbol: `ETH`, // 2-6 characters long
//         decimals: 18,
//       },
//       rpcUrls: [
//         'https://mainnet.optimism.io',
//         'https://opt-mainnet.g.alchemy.com/v2/demo',
//         'https://optimism.blockpi.network/v1/rpc/public',
//         'https://rpc.ankr.com/optimism',
//         'https://optimism-mainnet.public.blastapi.io'
//     ],
//       blockExplorerUrls: ['https://optimistic.etherscan.io'],
//       iconUrls:[], // Currently ignored.
//     }
// }