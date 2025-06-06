import { BigNumber } from '@ethersproject/bignumber';
import { Pair } from '@uniswap/v2-sdk';
import { Pool as V3Pool } from '@uniswap/v3-sdk';
import { Pool as V4Pool } from '@uniswap/v4-sdk';
import sinon from 'sinon';
import {
  CachedRoutes,
  CurrencyAmount,
  DAI_MAINNET,
  IGasModel,
  MixedRouteWithValidQuote,
  USDC_MAINNET as USDC,
  V2PoolProvider,
  V2RouteWithValidQuote,
  V3PoolProvider,
  V3Route,
  V3RouteWithValidQuote,
  V3RouteWithValidQuoteParams,
  V4PoolProvider,
} from '../../../../../../src';
import {
  buildMockV2PoolAccessor,
  buildMockV3PoolAccessor, buildMockV4PoolAccessor,
  DAI_USDT,
  DAI_USDT_LOW,
  DAI_USDT_V4_LOW,
  DAI_WETH,
  DAI_WETH_MEDIUM,
  DAI_WETH_V4_MEDIUM,
  NONTOKEN,
  UNI_WETH_MEDIUM,
  UNI_WETH_V4_MEDIUM,
  USDC_DAI,
  USDC_DAI_LOW,
  USDC_DAI_MEDIUM,
  USDC_DAI_V4_LOW,
  USDC_DAI_V4_MEDIUM,
  USDC_USDT_MEDIUM,
  USDC_USDT_V4_MEDIUM,
  USDC_WETH,
  USDC_WETH_LOW,
  USDC_WETH_V4_LOW,
  WBTC_WETH,
  WETH9_USDT_LOW,
  WETH9_USDT_V4_LOW,
  WETH_NONTOKEN_MEDIUM,
  WETH_USDT
} from '../../../../../test-util/mock-data';
import { ChainId, TradeType, WETH9 } from 'pnc-sdk-core';
import { Protocol } from '@uniswap/router-sdk';

export function getMockedMixedGasModel(): IGasModel<MixedRouteWithValidQuote> {
  const mockMixedGasModel = {
    estimateGasCost: sinon.stub(),
  };

  mockMixedGasModel.estimateGasCost.callsFake((r) => {
    return {
      gasEstimate: BigNumber.from(10000),
      gasCostInToken: CurrencyAmount.fromRawAmount(r.quoteToken, 0),
      gasCostInUSD: CurrencyAmount.fromRawAmount(USDC, 0),
    };
  });

  return mockMixedGasModel;
}

export function getMockedV3GasModel(): IGasModel<V3RouteWithValidQuote> {
  const mockV3GasModel = {
    estimateGasCost: sinon.stub(),
  };

  mockV3GasModel.estimateGasCost.callsFake((r) => {
    return {
      gasEstimate: BigNumber.from(10000),
      gasCostInToken: CurrencyAmount.fromRawAmount(r.quoteToken, 0),
      gasCostInUSD: CurrencyAmount.fromRawAmount(USDC, 0),
    };
  });

  return mockV3GasModel;
}

export function getMockedV4PoolProvider(): V4PoolProvider {
  const mockV4PoolProvider = sinon.createStubInstance(V4PoolProvider);

  const v4MockPools = [
    USDC_DAI_V4_LOW,
    USDC_DAI_V4_MEDIUM,
    USDC_WETH_V4_LOW,
    WETH9_USDT_V4_LOW,
    DAI_USDT_V4_LOW,
    USDC_USDT_V4_MEDIUM,
    UNI_WETH_V4_MEDIUM,
    DAI_WETH_V4_MEDIUM
  ];

  mockV4PoolProvider.getPools.resolves(buildMockV4PoolAccessor(v4MockPools));
  mockV4PoolProvider.getPoolId.callsFake((cA, cB, fee, tickSpacing, hooks) => ({
    poolId: V4Pool.getPoolId(cA, cB, fee, tickSpacing, hooks),
    currency0: cA,
    currency1: cB,
  }));

  return mockV4PoolProvider;
}

export function getMockedV3PoolProvider(): V3PoolProvider {
  const mockV3PoolProvider = sinon.createStubInstance(V3PoolProvider);

  const v3MockPools = [
    USDC_DAI_LOW,
    USDC_DAI_MEDIUM,
    USDC_WETH_LOW,
    WETH9_USDT_LOW,
    DAI_USDT_LOW,
    USDC_USDT_MEDIUM,
    UNI_WETH_MEDIUM,
    DAI_WETH_MEDIUM
  ];

  mockV3PoolProvider.getPools.resolves(buildMockV3PoolAccessor(v3MockPools));
  mockV3PoolProvider.getPoolAddress.callsFake((tA, tB, fee) => ({
    poolAddress: V3Pool.getAddress(tA, tB, fee),
    token0: tA,
    token1: tB,
  }));

  return mockV3PoolProvider;
}

export function getMockedV2GasModel(): IGasModel<V2RouteWithValidQuote> {
  const mockV2GasModel = {
    estimateGasCost: sinon.stub(),
  };

  mockV2GasModel.estimateGasCost.callsFake((r) => {
    return {
      gasEstimate: BigNumber.from(10000),
      gasCostInToken: CurrencyAmount.fromRawAmount(r.quoteToken, 0),
      gasCostInUSD: CurrencyAmount.fromRawAmount(USDC, 0),
    };
  });

  return mockV2GasModel;
}

export function getMockedV2PoolProvider(): V2PoolProvider {
  const mockV2PoolProvider = sinon.createStubInstance(V2PoolProvider);
  const v2MockPools: Pair[] = [DAI_USDT, USDC_WETH, WETH_USDT, USDC_DAI, WBTC_WETH, DAI_WETH];
  mockV2PoolProvider.getPools.resolves(buildMockV2PoolAccessor(v2MockPools));
  mockV2PoolProvider.getPoolAddress.callsFake((tA, tB) => ({
    poolAddress: Pair.getAddress(tA, tB),
    token0: tA,
    token1: tB,
  }));
  return mockV2PoolProvider;
}

export function getV3RouteWithInValidQuoteStub(
  overrides?: Partial<V3RouteWithValidQuoteParams>
): V3RouteWithValidQuote {
  const route = new V3Route([WETH_NONTOKEN_MEDIUM], NONTOKEN, WETH9[ChainId.MAINNET]!);

  return new V3RouteWithValidQuote({
    amount: CurrencyAmount.fromRawAmount(WETH9[ChainId.MAINNET]!, 1),
    rawQuote: BigNumber.from(100),
    sqrtPriceX96AfterList: [BigNumber.from(1)],
    initializedTicksCrossedList: [1],
    quoterGasEstimate: BigNumber.from(100000), // unused
    percent: 100,
    route,
    gasModel: getMockedV3GasModel(),
    quoteToken: DAI_MAINNET,
    tradeType: TradeType.EXACT_INPUT,
    v3PoolProvider: getMockedV3PoolProvider(),
    ...overrides,
  });
}

export function getInvalidCachedRoutesStub(
  blockNumber: number
): CachedRoutes | undefined {
  return CachedRoutes.fromRoutesWithValidQuotes([getV3RouteWithInValidQuoteStub()], ChainId.MAINNET, USDC, DAI_MAINNET, [Protocol.V2, Protocol.V3, Protocol.MIXED], blockNumber, TradeType.EXACT_INPUT, '1.1');
}

