import {
  MixedRouteSDK,
  Protocol,
  SwapRouter as SwapRouter02,
  Trade,
} from '@uniswap/router-sdk';
import { ChainId, Currency, TradeType } from 'pnc-sdk-core';
import {
  SwapRouter as UniversalRouter,
  UNIVERSAL_ROUTER_ADDRESS,
} from '@uniswap/universal-router-sdk';
import { Route as V2RouteRaw } from '@uniswap/v2-sdk';
import { Route as V3RouteRaw } from '@uniswap/v3-sdk';
import { Route as V4RouteRaw } from '@uniswap/v4-sdk';
import _ from 'lodash';

import {
  CurrencyAmount,
  MethodParameters,
  MixedRouteWithValidQuote,
  RouteWithValidQuote,
  SwapOptions,
  SwapType,
  SWAP_ROUTER_02_ADDRESSES,
  V2RouteWithValidQuote,
  V3RouteWithValidQuote,
  V4RouteWithValidQuote,
} from '..';

export function buildTrade<TTradeType extends TradeType>(
  tokenInCurrency: Currency,
  tokenOutCurrency: Currency,
  tradeType: TTradeType,
  routeAmounts: RouteWithValidQuote[]
): Trade<Currency, Currency, TTradeType> {
  /// Removed partition because of new mixedRoutes
  const v4RouteAmounts = _.filter(
    routeAmounts,
    (routeAmount) => routeAmount.protocol === Protocol.V4
  );
  const v3RouteAmounts = _.filter(
    routeAmounts,
    (routeAmount) => routeAmount.protocol === Protocol.V3
  );
  const v2RouteAmounts = _.filter(
    routeAmounts,
    (routeAmount) => routeAmount.protocol === Protocol.V2
  );
  const mixedRouteAmounts = _.filter(
    routeAmounts,
    (routeAmount) => routeAmount.protocol === Protocol.MIXED
  );

  // TODO: ROUTE-248 - refactor route objects for the trade object composition
  const v4Routes = _.map<
    V4RouteWithValidQuote,
    {
      routev4: V4RouteRaw<Currency, Currency>;
      inputAmount: CurrencyAmount;
      outputAmount: CurrencyAmount;
    }
  >(
    v4RouteAmounts as V4RouteWithValidQuote[],
    (routeAmount: V4RouteWithValidQuote) => {
      const { route, amount, quote } = routeAmount;

      // The route, amount and quote are all in terms of wrapped tokens.
      // When constructing the Trade object the inputAmount/outputAmount must
      // use native currencies if specified by the user. This is so that the Trade knows to wrap/unwrap.
      if (tradeType == TradeType.EXACT_INPUT) {
        const amountCurrency = CurrencyAmount.fromFractionalAmount(
          tokenInCurrency,
          amount.numerator,
          amount.denominator
        );
        const quoteCurrency = CurrencyAmount.fromFractionalAmount(
          tokenOutCurrency,
          quote.numerator,
          quote.denominator
        );

        const routeRaw = new V4RouteRaw(
          route.pools,
          amountCurrency.currency,
          quoteCurrency.currency
        );

        return {
          routev4: routeRaw,
          inputAmount: amountCurrency,
          outputAmount: quoteCurrency,
        };
      } else {
        const quoteCurrency = CurrencyAmount.fromFractionalAmount(
          tokenInCurrency,
          quote.numerator,
          quote.denominator
        );

        const amountCurrency = CurrencyAmount.fromFractionalAmount(
          tokenOutCurrency,
          amount.numerator,
          amount.denominator
        );

        const routeCurrency = new V4RouteRaw(
          route.pools,
          quoteCurrency.currency,
          amountCurrency.currency
        );

        return {
          routev4: routeCurrency,
          inputAmount: quoteCurrency,
          outputAmount: amountCurrency,
        };
      }
    }
  );

  const v3Routes = _.map<
    V3RouteWithValidQuote,
    {
      routev3: V3RouteRaw<Currency, Currency>;
      inputAmount: CurrencyAmount;
      outputAmount: CurrencyAmount;
    }
  >(
    v3RouteAmounts as V3RouteWithValidQuote[],
    (routeAmount: V3RouteWithValidQuote) => {
      const { route, amount, quote } = routeAmount;

      // The route, amount and quote are all in terms of wrapped tokens.
      // When constructing the Trade object the inputAmount/outputAmount must
      // use native currencies if specified by the user. This is so that the Trade knows to wrap/unwrap.
      if (tradeType == TradeType.EXACT_INPUT) {
        const amountCurrency = CurrencyAmount.fromFractionalAmount(
          tokenInCurrency,
          amount.numerator,
          amount.denominator
        );
        const quoteCurrency = CurrencyAmount.fromFractionalAmount(
          tokenOutCurrency,
          quote.numerator,
          quote.denominator
        );

        const routeRaw = new V3RouteRaw(
          route.pools,
          amountCurrency.currency,
          quoteCurrency.currency
        );

        return {
          routev3: routeRaw,
          inputAmount: amountCurrency,
          outputAmount: quoteCurrency,
        };
      } else {
        const quoteCurrency = CurrencyAmount.fromFractionalAmount(
          tokenInCurrency,
          quote.numerator,
          quote.denominator
        );

        const amountCurrency = CurrencyAmount.fromFractionalAmount(
          tokenOutCurrency,
          amount.numerator,
          amount.denominator
        );

        const routeCurrency = new V3RouteRaw(
          route.pools,
          quoteCurrency.currency,
          amountCurrency.currency
        );

        return {
          routev3: routeCurrency,
          inputAmount: quoteCurrency,
          outputAmount: amountCurrency,
        };
      }
    }
  );

  const v2Routes = _.map<
    V2RouteWithValidQuote,
    {
      routev2: V2RouteRaw<Currency, Currency>;
      inputAmount: CurrencyAmount;
      outputAmount: CurrencyAmount;
    }
  >(
    v2RouteAmounts as V2RouteWithValidQuote[],
    (routeAmount: V2RouteWithValidQuote) => {
      const { route, amount, quote } = routeAmount;

      // The route, amount and quote are all in terms of wrapped tokens.
      // When constructing the Trade object the inputAmount/outputAmount must
      // use native currencies if specified by the user. This is so that the Trade knows to wrap/unwrap.
      if (tradeType == TradeType.EXACT_INPUT) {
        const amountCurrency = CurrencyAmount.fromFractionalAmount(
          tokenInCurrency,
          amount.numerator,
          amount.denominator
        );
        const quoteCurrency = CurrencyAmount.fromFractionalAmount(
          tokenOutCurrency,
          quote.numerator,
          quote.denominator
        );

        const routeV2SDK = new V2RouteRaw(
          route.pairs,
          amountCurrency.currency,
          quoteCurrency.currency
        );

        return {
          routev2: routeV2SDK,
          inputAmount: amountCurrency,
          outputAmount: quoteCurrency,
        };
      } else {
        const quoteCurrency = CurrencyAmount.fromFractionalAmount(
          tokenInCurrency,
          quote.numerator,
          quote.denominator
        );

        const amountCurrency = CurrencyAmount.fromFractionalAmount(
          tokenOutCurrency,
          amount.numerator,
          amount.denominator
        );

        const routeV2SDK = new V2RouteRaw(
          route.pairs,
          quoteCurrency.currency,
          amountCurrency.currency
        );

        return {
          routev2: routeV2SDK,
          inputAmount: quoteCurrency,
          outputAmount: amountCurrency,
        };
      }
    }
  );

  const mixedRoutes = _.map<
    MixedRouteWithValidQuote,
    {
      mixedRoute: MixedRouteSDK<Currency, Currency>;
      inputAmount: CurrencyAmount;
      outputAmount: CurrencyAmount;
    }
  >(
    mixedRouteAmounts as MixedRouteWithValidQuote[],
    (routeAmount: MixedRouteWithValidQuote) => {
      const { route, amount, quote } = routeAmount;

      if (tradeType != TradeType.EXACT_INPUT) {
        throw new Error(
          'Mixed routes are only supported for exact input trades'
        );
      }

      // The route, amount and quote are all in terms of wrapped tokens.
      // When constructing the Trade object the inputAmount/outputAmount must
      // use native currencies if specified by the user. This is so that the Trade knows to wrap/unwrap.
      const amountCurrency = CurrencyAmount.fromFractionalAmount(
        tokenInCurrency,
        amount.numerator,
        amount.denominator
      );
      const quoteCurrency = CurrencyAmount.fromFractionalAmount(
        tokenOutCurrency,
        quote.numerator,
        quote.denominator
      );

      // we cannot retain fake pools for mixed routes,
      // when we generate the ur swap calldata
      const routeRaw = new MixedRouteSDK(
        route.pools,
        amountCurrency.currency,
        quoteCurrency.currency
      );

      return {
        mixedRoute: routeRaw,
        inputAmount: amountCurrency,
        outputAmount: quoteCurrency,
      };
    }
  );

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const trade = new Trade({
    v2Routes,
    v3Routes,
    v4Routes,
    mixedRoutes,
    tradeType,
  });

  return trade;
}

export function buildSwapMethodParameters(
  trade: Trade<Currency, Currency, TradeType>,
  swapConfig: SwapOptions,
  chainId: ChainId
): MethodParameters {
  if (swapConfig.type == SwapType.UNIVERSAL_ROUTER) {
    return {
      ...UniversalRouter.swapCallParameters(trade, swapConfig),
      to: UNIVERSAL_ROUTER_ADDRESS(swapConfig.version, chainId),
    };
  } else if (swapConfig.type == SwapType.SWAP_ROUTER_02) {
    const { recipient, slippageTolerance, deadline, inputTokenPermit } =
      swapConfig;

    return {
      ...SwapRouter02.swapCallParameters(trade, {
        recipient,
        slippageTolerance,
        deadlineOrPreviousBlockhash: deadline,
        inputTokenPermit,
      }),
      to: SWAP_ROUTER_02_ADDRESSES(chainId),
    };
  }

  throw new Error(`Unsupported swap type ${swapConfig}`);
}
