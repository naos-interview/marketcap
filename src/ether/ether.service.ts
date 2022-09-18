import { Injectable } from '@nestjs/common';
import { Timeout } from '@nestjs/schedule';
import { ethers } from 'ethers';
import Big from 'big.js';
import usdtabi from './usdtabi.json';
import uniswapV2FactoryAbi from './uniswapV2FactoryAbi.json';
import uniswapPairAbi from './uniswapPairAbi.json';
import { ConfigService } from '@nestjs/config';
import CoinGecko from 'coingecko-api';

@Injectable()
export class EtherService {
  provider: ethers.providers.JsonRpcProvider;
  usdt: string;
  uniswapV2Factory: string;
  CoinGeckoClient: CoinGecko;
  constructor(private configService: ConfigService) {
    this.provider = new ethers.providers.JsonRpcProvider(
      this.configService.get<string>('HTTP_PROVIDER'),
    );
    this.usdt = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
    this.uniswapV2Factory = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';
    this.CoinGeckoClient = new CoinGecko();
  }

  private async getAbi(address) {
    const etherscanApiKey = this.configService.get<string>('ETHERSCAN_API_KEY');
    const url = `https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${etherscanApiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    const abi = data.result;
    return abi;
  }

  async getPrice(address: string) {
    const result = await this.CoinGeckoClient.simple.fetchTokenPrice({
      contract_addresses: address,
      vs_currencies: 'usd',
    });
    return result.data[address.toLocaleLowerCase()].usd;
  }

  async getMarketcap(address: string) {
    const price = await this.getPrice(address);
    const abi = await this.getAbi(address);
    const tokenContract = new ethers.Contract(address, abi, this.provider);
    const tokenDecimals = await tokenContract.decimals();
    const tokenTotalSupply =
      (await tokenContract.totalSupply()) / 10 ** tokenDecimals;
    const marketCap = price * tokenTotalSupply;
    console.log(await tokenContract.name());
    console.log('price:' + price);
    console.log('total supply:' + tokenTotalSupply);
    console.log('marketcap:' + marketCap);
    return marketCap;
  }
  // }

  // @Timeout(1000)
  // async getMarketCap(_token: string) {
  //   const usdt = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
  //   const dai = '0x6B175474E89094C44Da98b954EedeAC495271d0F';

  //   const uniswapV2Factory = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';
  //   const uniswapContract = new ethers.Contract(
  //     uniswapV2Factory,
  //     uniswapV2FactoryAbi,
  //     this.provider,
  //   );
  //   const pairAddress = await uniswapContract.getPair(dai, usdt);
  //   if (pairAddress === '0x0000000000000000000000000000000000000000') {
  //     throw new Error('pair is not exisit');
  //   }

  //   const pairContract = await new ethers.Contract(
  //     pairAddress,
  //     uniswapPairAbi,
  //     this.provider,
  //   );

  //   const daiAbi = await this.getAbi(dai);
  //   const usdtContract = new ethers.Contract(usdt, usdtabi, this.provider);
  //   const daiContract = new ethers.Contract(dai, daiAbi, this.provider);
  //   const usdtDecimals = await usdtContract.decimals();
  //   const daiDecimals = await daiContract.decimals();
  //   const totalSupply = (await daiContract.totalSupply()) / 10 ** daiDecimals;

  //   const reserves = await pairContract.getReserves();
  //   const r0 = new Big(reserves._reserve0);
  //   const r1 = new Big(reserves._reserve1);
  //   const price = r0 / 10 ** daiDecimals / (r1 / 10 ** usdtDecimals);
  //   console.log(price);
  //   console.log(totalSupply);
  //   const marketCap = price * totalSupply;

  //   console.log(marketCap);
  // }
  // @Timeout(1000)
  // async check() {
  //   const usdt = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
  //   const usdtContract = new ethers.Contract(usdt, usdtabi, this.provider);
  //   const decimals = await usdtContract.decimals();
  //   const totalSupply = (await usdtContract.totalSupply()) / 10 ** decimals;
  //   const x = new Big(totalSupply);
  //   console.log(await usdtContract.name());
  //   console.log(x.toString());
  // }
}
