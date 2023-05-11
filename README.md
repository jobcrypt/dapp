## JobCrypt - Web3 jobs for blockchain people
Welcome to the JobCrypt build repository. This is where the code for the various JobCrypt deployments is stored. 
Each deployment has it's own code base with a reference build that has all the standard features that should be in any JobCrypt deployment
Each deployment is contained in it's own folder. Testnet deployments have their own folders. Each folder has the solidity code that goes with 
the matching UI code. 
For release testnet code is promoted to the matching LIVE network folder. Our release approach is "scrap yesterday" i.e. we baseline the live version prior to release and then completely replace it with the promoted version. 

Current folders are available for: 

 - optimism 
 - optimism - testnet - note this is not the same as sepolia which is for Ethereum mainnet, we will be migrating off Sepolia shortly as JobCrypt is currently not compatible with Ethereum at current gas profiles. 
 - okc 
 - okc - testnet 
 - caduceus 
 - caduceus - testnet 
 
 more chains are to follow. 
 Each folder is hosted on a fleek domain which uses continuous integration for deployment. Therefore when testing you should refer to the matching fleek domain to see
 the propagated changes. 
 
 Below is the CI domain table
 
 |Deployment | CI Link | 
 |------------|-----------|
 | Optimism 			| https://jobcryptoptimism.on.fleek.co/ |
 | Optimism Testnet 	| https://jobcryptoptimismtestnet.on.fleek.co  | 
 | Caduceus 			| https://jobcryptcaduceus.on.fleek.co/ |
 | Caduceus Testnet 	| https://jobcryptcaduceustestnet.on.fleek.co/ |
 | OK Chain 			| https://jobcryptokc.on.fleek.co/ | 
 | OK Chain Testnet 	| | 
 | Sepolia Testnet 		| https://sepoliajobcrypt.on.fleek.co/ | 
 | Reference Testnet 	| https://jobcryptreference.on.fleek.co/ | 
 | Optimism 	UI/UX Design 1.0		| (https://www.figma.com/file/bTIBikr9PeREnobwRVEf6G/Job-Crypt-Website?type=design&node-id=357%3A12179&t=gPnIkha7JfFvv8LW-1) |
