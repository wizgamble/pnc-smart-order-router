import { ChainId, Currency, Ether } from 'pnc-sdk-core';
import { USDT_ON } from '../../build/main';
import {
  CEUR_CELO,
  CEUR_CELO_ALFAJORES,
  CUSD_CELO,
  DAI_MAINNET,
  DAI_ON,
  ExtendedEther,
  nativeOnChain,
  UNI_GOERLI,
  UNI_MAINNET,
  USDC_MAINNET,
  USDC_NATIVE_ARBITRUM,
  USDC_NATIVE_AVAX,
  USDC_NATIVE_BASE,
  USDC_NATIVE_OPTIMISM,
  USDC_NATIVE_POLYGON,
  USDC_ON, USDC_UNICHAIN,
  USDC_WORLDCHAIN,
  USDC_ZORA,
  USDT_MAINNET,
  USDT_MONAD_TESTNET,
  V4_SEPOLIA_TEST_A,
  WETH9,
  WLD_WORLDCHAIN,
  WNATIVE_ON
} from '../../src';
import { BULLET, BULLET_WITHOUT_TAX } from './mock-data';

export const WHALES = (token: Currency): string => {
  let USDC_UNICHAIN_SEPOLIA;
  switch (token) {
    case Ether.onChain(ChainId.MAINNET) as Currency:
      return '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
    case ExtendedEther.onChain(ChainId.MAINNET):
      return '0x0716a17FBAeE714f1E6aB0f9d59edbC5f09815C0';
    case ExtendedEther.onChain(ChainId.ARBITRUM_ONE):
      return '0xf977814e90da44bfa03b6295a0616a897441acec';
    case nativeOnChain(ChainId.POLYGON):
      return '0xe7804c37c13166ff0b37f5ae0bb07a3aebb6e245';
    case nativeOnChain(ChainId.GOERLI):
      return '0x08505F42D5666225d5d73B842dAdB87CCA44d1AE';
    case nativeOnChain(ChainId.BASE):
      return '0x66e4e30cf1eb6155c1bf0422879a470e582f3a50';
    case nativeOnChain(ChainId.AVALANCHE):
      return '0x4aeFa39caEAdD662aE31ab0CE7c8C2c9c0a013E8';
    case nativeOnChain(ChainId.BNB):
      return '0x8894E0a0c962CB723c1976a4421c95949bE2D4E3';
    case nativeOnChain(ChainId.OPTIMISM):
      return '0xf977814e90da44bfa03b6295a0616a897441acec';
    case nativeOnChain(ChainId.ZORA):
      return '0xBC698ce1933aFb2980D4A5a0F85feA1b02fbb1c9';
    case nativeOnChain(ChainId.UNICHAIN):
      return '0x1f49a3fa2b5B5b61df8dE486aBb6F3b9df066d86';
    case WETH9[1]:
      return '0x6B44ba0a126a2A1a8aa6cD1AdeeD002e141Bcd44';
    case WNATIVE_ON(ChainId.MAINNET):
      return '0xf04a5cc80b1e94c69b48f5ee68a08cd2f09a7c3e';
    case WNATIVE_ON(ChainId.ARBITRUM_ONE):
      return '0x80a9ae39310abf666a87c743d6ebbd0e8c42158e';
    case WNATIVE_ON(ChainId.GOERLI):
      return '0x2372031bb0fc735722aa4009aebf66e8beaf4ba1';
    case WNATIVE_ON(ChainId.POLYGON):
      return '0x369582d2010b6ed950b571f4101e3bb9b554876f';
    case WNATIVE_ON(ChainId.BASE):
      return '0x0172e05392aba65366C4dbBb70D958BbF43304E4';
    case WNATIVE_ON(ChainId.OPTIMISM):
      return '0x274d9E726844AB52E351e8F1272e7fc3f58B7E5F';
    case WNATIVE_ON(ChainId.BNB):
      return '0x59d779BED4dB1E734D3fDa3172d45bc3063eCD69';
    case WNATIVE_ON(ChainId.AVALANCHE):
      return '0xba12222222228d8ba445958a75a0704d566bf2c8';
    case WNATIVE_ON(ChainId.ZORA):
      return '0xBC698ce1933aFb2980D4A5a0F85feA1b02fbb1c9';
    case WNATIVE_ON(ChainId.UNICHAIN):
      return '0x07aE8551Be970cB1cCa11Dd7a11F47Ae82e70E67';
    case USDC_MAINNET:
      return '0x8eb8a3b98659cce290402893d0123abb75e3ab28';
    case UNI_MAINNET:
    case DAI_MAINNET:
    case USDT_MAINNET:
      return '0x47ac0fb4f2d84898e4d9e7b4dab3c24507a6d503';
    case UNI_GOERLI:
      return '0x41653c7d61609d856f29355e404f310ec4142cfb';
    case USDC_ON(ChainId.OPTIMISM):
      return '0xad7b4c162707e0b2b5f6fddbd3f8538a5fba0d60';
    case USDC_NATIVE_OPTIMISM:
      return '0xf491d040110384dbcf7f241ffe2a546513fd873d';
    case USDC_ON(ChainId.OPTIMISM_GOERLI):
      return '0x4cb0645e92a3b5872ae54e5704e03c09ca0ea220';
    case USDC_ON(ChainId.ARBITRUM_ONE):
      return '0xf89d7b9c864f589bbf53a82105107622b35eaa40';
    case USDC_NATIVE_ARBITRUM:
      return '0xa656f7d2a93a6f5878aa768f24eb38ec8c827fe2';
    case USDC_ON(ChainId.ARBITRUM_GOERLI):
      return '0x7e3114fcbc1d529fd96de61d65d4a03071609c56';
    case USDC_ON(ChainId.SEPOLIA):
      return '0xe2a3422f3168149AD2d11b4dE2B97b05f1ebF76e';
    case USDC_ON(ChainId.POLYGON):
      return '0xe7804c37c13166ff0b37f5ae0bb07a3aebb6e245';
    case USDC_NATIVE_POLYGON:
      return '0x2C2301FDB0bfA06EAABaA0122CbCEb2265337C25';
    case USDC_ON(ChainId.POLYGON_MUMBAI):
      return '0x48520ff9b32d8b5bf87abf789ea7b3c394c95ebe';
    case USDC_ON(ChainId.AVALANCHE):
      return '0xC94bb9b883Ab642C1C3Ed07af4E36523e7DaF1Fe';
    case USDC_NATIVE_AVAX:
      return '0x4aeFa39caEAdD662aE31ab0CE7c8C2c9c0a013E8';
    case USDC_ON(ChainId.BNB):
      return '0x8894E0a0c962CB723c1976a4421c95949bE2D4E3';
    case USDC_ON(ChainId.BASE):
      return '0x4a3636608d7bc5776cb19eb72caa36ebb9ea683b';
    case USDC_ZORA:
      return '0xbC59f8F3b275AA56A90D13bAE7cCe5e6e11A3b17';
    case USDC_NATIVE_BASE:
      return '0x20fe51a9229eef2cf8ad9e89d91cab9312cf3b7a';
    case USDC_ON(ChainId.UNICHAIN_SEPOLIA):
      return '0xca8cA8840c77589981E63f4D8122fFEc4b74e2a1';
    case USDC_UNICHAIN:
      return '0xB5A2a236581dbd6BCECD8A25EeBFF140595f138C';
    case DAI_ON(ChainId.GOERLI):
      return '0x20918f71e99c09ae2ac3e33dbde33457d3be01f4';
    case DAI_ON(ChainId.SEPOLIA):
      return '0x67550Df3290415611F6C140c81Cd770Ff1742cb9';
    case DAI_ON(ChainId.OPTIMISM):
      return '0x100bdc1431a9b09c61c0efc5776814285f8fb248';
    case DAI_ON(ChainId.ARBITRUM_ONE):
      return '0x07b23ec6aedf011114d3ab6027d69b561a2f635e';
    case DAI_ON(ChainId.POLYGON):
      return '0xf04adbf75cdfc5ed26eea4bbbb991db002036bdd';
    case DAI_ON(ChainId.POLYGON_MUMBAI):
      return '0xda8ab4137fe28f969b27c780d313d1bb62c8341e';
    case DAI_ON(ChainId.AVALANCHE):
      return '0x835866d37AFB8CB8F8334dCCdaf66cf01832Ff5D';
    case CEUR_CELO:
      return '0x612A7c4E40EAcb63dADaD4939dFedb9d3397E6fd';
    case CEUR_CELO_ALFAJORES:
      return '0x489324b266DFb125CC791B91Bc68F307cE3f6691';
    case WNATIVE_ON(ChainId.CELO):
      return '0x6cC083Aed9e3ebe302A6336dBC7c921C9f03349E';
    case CUSD_CELO:
      return '0xC32cBaf3D44dA6fbC761289b871af1A30cc7f993';
    case BULLET_WITHOUT_TAX || BULLET:
      return '0x171d311eAcd2206d21Cb462d661C33F0eddadC03';
    case V4_SEPOLIA_TEST_A:
      return '0xB7a249bdeFf39727B5Eb4C7AD458f682BAe6aDAD';
    case WLD_WORLDCHAIN:
      return '0x6348A4a4dF173F68eB28A452Ca6c13493e447aF1';
    case USDC_WORLDCHAIN:
      return '0x45CED21E1d5eFB631997F2Fa1727d5577427d350';
    case nativeOnChain(ChainId.WORLDCHAIN):
      return '0x6348A4a4dF173F68eB28A452Ca6c13493e447aF1';
    case WNATIVE_ON(ChainId.WORLDCHAIN):
      return '0x6348A4a4dF173F68eB28A452Ca6c13493e447aF1';
    case USDC_UNICHAIN_SEPOLIA:
      return '0xE49ACc3B16c097ec88Dc9352CE4Cd57aB7e35B95';
    case nativeOnChain(ChainId.UNICHAIN_SEPOLIA):
      return '0xE49ACc3B16c097ec88Dc9352CE4Cd57aB7e35B95';
    case WNATIVE_ON(ChainId.UNICHAIN_SEPOLIA):
      return '0xE49ACc3B16c097ec88Dc9352CE4Cd57aB7e35B95';
    case USDT_MONAD_TESTNET:
      // TODO: get a real whale address for monad testnet
      return '0x440e9a5b9df01D7CFf465D391A883315A5e8f41c';
    case USDT_ON(ChainId.MONAD_TESTNET):
      // TODO: get a real whale address for monad testnet
      return '0x440e9a5b9df01D7CFf465D391A883315A5e8f41c';
    case WNATIVE_ON(ChainId.MONAD_TESTNET):
      // TODO: get a real whale address for monad testnet
      return '0x440e9a5b9df01D7CFf465D391A883315A5e8f41c'
    case USDC_UNICHAIN:
      // TODO: get a real whale address for unichain mainnet
      return '0x440e9a5b9df01D7CFf465D391A883315A5e8f41c';
    case nativeOnChain(ChainId.UNICHAIN):
      // TODO: get a real whale address for unichain mainnet
      return '0x440e9a5b9df01D7CFf465D391A883315A5e8f41c';
    case WNATIVE_ON(ChainId.UNICHAIN):
      // TODO: get a real whale address for unichain mainnet
      return '0x440e9a5b9df01D7CFf465D391A883315A5e8f41c';
    case WNATIVE_ON(ChainId.SONEIUM):
      return '0xfdF6a5b37910fbDa8A52F566E4F3e224652C4818';
    case USDC_ON(ChainId.SONEIUM):
      return '0x07aE8551Be970cB1cCa11Dd7a11F47Ae82e70E67';
    default:
      return '0xf04a5cc80b1e94c69b48f5ee68a08cd2f09a7c3e';
  }
};
