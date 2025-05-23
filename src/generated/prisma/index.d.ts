
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Campanha
 * 
 */
export type Campanha = $Result.DefaultSelection<Prisma.$CampanhaPayload>
/**
 * Model Doacao
 * 
 */
export type Doacao = $Result.DefaultSelection<Prisma.$DoacaoPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const TipoUsuario: {
  DOADOR: 'DOADOR',
  INSTITUICAO: 'INSTITUICAO'
};

export type TipoUsuario = (typeof TipoUsuario)[keyof typeof TipoUsuario]

}

export type TipoUsuario = $Enums.TipoUsuario

export const TipoUsuario: typeof $Enums.TipoUsuario

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.campanha`: Exposes CRUD operations for the **Campanha** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Campanhas
    * const campanhas = await prisma.campanha.findMany()
    * ```
    */
  get campanha(): Prisma.CampanhaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.doacao`: Exposes CRUD operations for the **Doacao** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Doacaos
    * const doacaos = await prisma.doacao.findMany()
    * ```
    */
  get doacao(): Prisma.DoacaoDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Campanha: 'Campanha',
    Doacao: 'Doacao'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "campanha" | "doacao"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Campanha: {
        payload: Prisma.$CampanhaPayload<ExtArgs>
        fields: Prisma.CampanhaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CampanhaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampanhaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CampanhaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampanhaPayload>
          }
          findFirst: {
            args: Prisma.CampanhaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampanhaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CampanhaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampanhaPayload>
          }
          findMany: {
            args: Prisma.CampanhaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampanhaPayload>[]
          }
          create: {
            args: Prisma.CampanhaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampanhaPayload>
          }
          createMany: {
            args: Prisma.CampanhaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CampanhaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampanhaPayload>[]
          }
          delete: {
            args: Prisma.CampanhaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampanhaPayload>
          }
          update: {
            args: Prisma.CampanhaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampanhaPayload>
          }
          deleteMany: {
            args: Prisma.CampanhaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CampanhaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CampanhaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampanhaPayload>[]
          }
          upsert: {
            args: Prisma.CampanhaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampanhaPayload>
          }
          aggregate: {
            args: Prisma.CampanhaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCampanha>
          }
          groupBy: {
            args: Prisma.CampanhaGroupByArgs<ExtArgs>
            result: $Utils.Optional<CampanhaGroupByOutputType>[]
          }
          count: {
            args: Prisma.CampanhaCountArgs<ExtArgs>
            result: $Utils.Optional<CampanhaCountAggregateOutputType> | number
          }
        }
      }
      Doacao: {
        payload: Prisma.$DoacaoPayload<ExtArgs>
        fields: Prisma.DoacaoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DoacaoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoacaoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DoacaoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoacaoPayload>
          }
          findFirst: {
            args: Prisma.DoacaoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoacaoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DoacaoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoacaoPayload>
          }
          findMany: {
            args: Prisma.DoacaoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoacaoPayload>[]
          }
          create: {
            args: Prisma.DoacaoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoacaoPayload>
          }
          createMany: {
            args: Prisma.DoacaoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DoacaoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoacaoPayload>[]
          }
          delete: {
            args: Prisma.DoacaoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoacaoPayload>
          }
          update: {
            args: Prisma.DoacaoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoacaoPayload>
          }
          deleteMany: {
            args: Prisma.DoacaoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DoacaoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DoacaoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoacaoPayload>[]
          }
          upsert: {
            args: Prisma.DoacaoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoacaoPayload>
          }
          aggregate: {
            args: Prisma.DoacaoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDoacao>
          }
          groupBy: {
            args: Prisma.DoacaoGroupByArgs<ExtArgs>
            result: $Utils.Optional<DoacaoGroupByOutputType>[]
          }
          count: {
            args: Prisma.DoacaoCountArgs<ExtArgs>
            result: $Utils.Optional<DoacaoCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    campanha?: CampanhaOmit
    doacao?: DoacaoOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    campanhas: number
    doacoes: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campanhas?: boolean | UserCountOutputTypeCountCampanhasArgs
    doacoes?: boolean | UserCountOutputTypeCountDoacoesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCampanhasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampanhaWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDoacoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DoacaoWhereInput
  }


  /**
   * Count Type CampanhaCountOutputType
   */

  export type CampanhaCountOutputType = {
    doacoes: number
  }

  export type CampanhaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doacoes?: boolean | CampanhaCountOutputTypeCountDoacoesArgs
  }

  // Custom InputTypes
  /**
   * CampanhaCountOutputType without action
   */
  export type CampanhaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampanhaCountOutputType
     */
    select?: CampanhaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CampanhaCountOutputType without action
   */
  export type CampanhaCountOutputTypeCountDoacoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DoacaoWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    nome: string | null
    email: string | null
    senha: string | null
    tipo: $Enums.TipoUsuario | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    nome: string | null
    email: string | null
    senha: string | null
    tipo: $Enums.TipoUsuario | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    nome: number
    email: number
    senha: number
    tipo: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    nome?: true
    email?: true
    senha?: true
    tipo?: true
    created_at?: true
    updated_at?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    nome?: true
    email?: true
    senha?: true
    tipo?: true
    created_at?: true
    updated_at?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    nome?: true
    email?: true
    senha?: true
    tipo?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    nome: string
    email: string
    senha: string
    tipo: $Enums.TipoUsuario
    created_at: Date
    updated_at: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    email?: boolean
    senha?: boolean
    tipo?: boolean
    created_at?: boolean
    updated_at?: boolean
    campanhas?: boolean | User$campanhasArgs<ExtArgs>
    doacoes?: boolean | User$doacoesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    email?: boolean
    senha?: boolean
    tipo?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    email?: boolean
    senha?: boolean
    tipo?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    nome?: boolean
    email?: boolean
    senha?: boolean
    tipo?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "email" | "senha" | "tipo" | "created_at" | "updated_at", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campanhas?: boolean | User$campanhasArgs<ExtArgs>
    doacoes?: boolean | User$doacoesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      campanhas: Prisma.$CampanhaPayload<ExtArgs>[]
      doacoes: Prisma.$DoacaoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nome: string
      email: string
      senha: string
      tipo: $Enums.TipoUsuario
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    campanhas<T extends User$campanhasArgs<ExtArgs> = {}>(args?: Subset<T, User$campanhasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampanhaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    doacoes<T extends User$doacoesArgs<ExtArgs> = {}>(args?: Subset<T, User$doacoesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoacaoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly nome: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly senha: FieldRef<"User", 'String'>
    readonly tipo: FieldRef<"User", 'TipoUsuario'>
    readonly created_at: FieldRef<"User", 'DateTime'>
    readonly updated_at: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.campanhas
   */
  export type User$campanhasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campanha
     */
    select?: CampanhaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campanha
     */
    omit?: CampanhaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampanhaInclude<ExtArgs> | null
    where?: CampanhaWhereInput
    orderBy?: CampanhaOrderByWithRelationInput | CampanhaOrderByWithRelationInput[]
    cursor?: CampanhaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CampanhaScalarFieldEnum | CampanhaScalarFieldEnum[]
  }

  /**
   * User.doacoes
   */
  export type User$doacoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doacao
     */
    select?: DoacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doacao
     */
    omit?: DoacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoacaoInclude<ExtArgs> | null
    where?: DoacaoWhereInput
    orderBy?: DoacaoOrderByWithRelationInput | DoacaoOrderByWithRelationInput[]
    cursor?: DoacaoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DoacaoScalarFieldEnum | DoacaoScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Campanha
   */

  export type AggregateCampanha = {
    _count: CampanhaCountAggregateOutputType | null
    _min: CampanhaMinAggregateOutputType | null
    _max: CampanhaMaxAggregateOutputType | null
  }

  export type CampanhaMinAggregateOutputType = {
    id: string | null
    titulo: string | null
    descricao: string | null
    localizacao: string | null
    data_inicio: Date | null
    data_fim: Date | null
    instituicao_id: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type CampanhaMaxAggregateOutputType = {
    id: string | null
    titulo: string | null
    descricao: string | null
    localizacao: string | null
    data_inicio: Date | null
    data_fim: Date | null
    instituicao_id: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type CampanhaCountAggregateOutputType = {
    id: number
    titulo: number
    descricao: number
    localizacao: number
    data_inicio: number
    data_fim: number
    instituicao_id: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type CampanhaMinAggregateInputType = {
    id?: true
    titulo?: true
    descricao?: true
    localizacao?: true
    data_inicio?: true
    data_fim?: true
    instituicao_id?: true
    created_at?: true
    updated_at?: true
  }

  export type CampanhaMaxAggregateInputType = {
    id?: true
    titulo?: true
    descricao?: true
    localizacao?: true
    data_inicio?: true
    data_fim?: true
    instituicao_id?: true
    created_at?: true
    updated_at?: true
  }

  export type CampanhaCountAggregateInputType = {
    id?: true
    titulo?: true
    descricao?: true
    localizacao?: true
    data_inicio?: true
    data_fim?: true
    instituicao_id?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type CampanhaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Campanha to aggregate.
     */
    where?: CampanhaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Campanhas to fetch.
     */
    orderBy?: CampanhaOrderByWithRelationInput | CampanhaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CampanhaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Campanhas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Campanhas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Campanhas
    **/
    _count?: true | CampanhaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CampanhaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CampanhaMaxAggregateInputType
  }

  export type GetCampanhaAggregateType<T extends CampanhaAggregateArgs> = {
        [P in keyof T & keyof AggregateCampanha]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCampanha[P]>
      : GetScalarType<T[P], AggregateCampanha[P]>
  }




  export type CampanhaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampanhaWhereInput
    orderBy?: CampanhaOrderByWithAggregationInput | CampanhaOrderByWithAggregationInput[]
    by: CampanhaScalarFieldEnum[] | CampanhaScalarFieldEnum
    having?: CampanhaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CampanhaCountAggregateInputType | true
    _min?: CampanhaMinAggregateInputType
    _max?: CampanhaMaxAggregateInputType
  }

  export type CampanhaGroupByOutputType = {
    id: string
    titulo: string
    descricao: string
    localizacao: string
    data_inicio: Date
    data_fim: Date
    instituicao_id: string
    created_at: Date
    updated_at: Date
    _count: CampanhaCountAggregateOutputType | null
    _min: CampanhaMinAggregateOutputType | null
    _max: CampanhaMaxAggregateOutputType | null
  }

  type GetCampanhaGroupByPayload<T extends CampanhaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CampanhaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CampanhaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CampanhaGroupByOutputType[P]>
            : GetScalarType<T[P], CampanhaGroupByOutputType[P]>
        }
      >
    >


  export type CampanhaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titulo?: boolean
    descricao?: boolean
    localizacao?: boolean
    data_inicio?: boolean
    data_fim?: boolean
    instituicao_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    instituicao?: boolean | UserDefaultArgs<ExtArgs>
    doacoes?: boolean | Campanha$doacoesArgs<ExtArgs>
    _count?: boolean | CampanhaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["campanha"]>

  export type CampanhaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titulo?: boolean
    descricao?: boolean
    localizacao?: boolean
    data_inicio?: boolean
    data_fim?: boolean
    instituicao_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    instituicao?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["campanha"]>

  export type CampanhaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titulo?: boolean
    descricao?: boolean
    localizacao?: boolean
    data_inicio?: boolean
    data_fim?: boolean
    instituicao_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    instituicao?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["campanha"]>

  export type CampanhaSelectScalar = {
    id?: boolean
    titulo?: boolean
    descricao?: boolean
    localizacao?: boolean
    data_inicio?: boolean
    data_fim?: boolean
    instituicao_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type CampanhaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "titulo" | "descricao" | "localizacao" | "data_inicio" | "data_fim" | "instituicao_id" | "created_at" | "updated_at", ExtArgs["result"]["campanha"]>
  export type CampanhaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    instituicao?: boolean | UserDefaultArgs<ExtArgs>
    doacoes?: boolean | Campanha$doacoesArgs<ExtArgs>
    _count?: boolean | CampanhaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CampanhaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    instituicao?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CampanhaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    instituicao?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CampanhaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Campanha"
    objects: {
      instituicao: Prisma.$UserPayload<ExtArgs>
      doacoes: Prisma.$DoacaoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      titulo: string
      descricao: string
      localizacao: string
      data_inicio: Date
      data_fim: Date
      instituicao_id: string
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["campanha"]>
    composites: {}
  }

  type CampanhaGetPayload<S extends boolean | null | undefined | CampanhaDefaultArgs> = $Result.GetResult<Prisma.$CampanhaPayload, S>

  type CampanhaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CampanhaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CampanhaCountAggregateInputType | true
    }

  export interface CampanhaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Campanha'], meta: { name: 'Campanha' } }
    /**
     * Find zero or one Campanha that matches the filter.
     * @param {CampanhaFindUniqueArgs} args - Arguments to find a Campanha
     * @example
     * // Get one Campanha
     * const campanha = await prisma.campanha.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CampanhaFindUniqueArgs>(args: SelectSubset<T, CampanhaFindUniqueArgs<ExtArgs>>): Prisma__CampanhaClient<$Result.GetResult<Prisma.$CampanhaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Campanha that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CampanhaFindUniqueOrThrowArgs} args - Arguments to find a Campanha
     * @example
     * // Get one Campanha
     * const campanha = await prisma.campanha.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CampanhaFindUniqueOrThrowArgs>(args: SelectSubset<T, CampanhaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CampanhaClient<$Result.GetResult<Prisma.$CampanhaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Campanha that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampanhaFindFirstArgs} args - Arguments to find a Campanha
     * @example
     * // Get one Campanha
     * const campanha = await prisma.campanha.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CampanhaFindFirstArgs>(args?: SelectSubset<T, CampanhaFindFirstArgs<ExtArgs>>): Prisma__CampanhaClient<$Result.GetResult<Prisma.$CampanhaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Campanha that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampanhaFindFirstOrThrowArgs} args - Arguments to find a Campanha
     * @example
     * // Get one Campanha
     * const campanha = await prisma.campanha.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CampanhaFindFirstOrThrowArgs>(args?: SelectSubset<T, CampanhaFindFirstOrThrowArgs<ExtArgs>>): Prisma__CampanhaClient<$Result.GetResult<Prisma.$CampanhaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Campanhas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampanhaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Campanhas
     * const campanhas = await prisma.campanha.findMany()
     * 
     * // Get first 10 Campanhas
     * const campanhas = await prisma.campanha.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const campanhaWithIdOnly = await prisma.campanha.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CampanhaFindManyArgs>(args?: SelectSubset<T, CampanhaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampanhaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Campanha.
     * @param {CampanhaCreateArgs} args - Arguments to create a Campanha.
     * @example
     * // Create one Campanha
     * const Campanha = await prisma.campanha.create({
     *   data: {
     *     // ... data to create a Campanha
     *   }
     * })
     * 
     */
    create<T extends CampanhaCreateArgs>(args: SelectSubset<T, CampanhaCreateArgs<ExtArgs>>): Prisma__CampanhaClient<$Result.GetResult<Prisma.$CampanhaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Campanhas.
     * @param {CampanhaCreateManyArgs} args - Arguments to create many Campanhas.
     * @example
     * // Create many Campanhas
     * const campanha = await prisma.campanha.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CampanhaCreateManyArgs>(args?: SelectSubset<T, CampanhaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Campanhas and returns the data saved in the database.
     * @param {CampanhaCreateManyAndReturnArgs} args - Arguments to create many Campanhas.
     * @example
     * // Create many Campanhas
     * const campanha = await prisma.campanha.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Campanhas and only return the `id`
     * const campanhaWithIdOnly = await prisma.campanha.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CampanhaCreateManyAndReturnArgs>(args?: SelectSubset<T, CampanhaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampanhaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Campanha.
     * @param {CampanhaDeleteArgs} args - Arguments to delete one Campanha.
     * @example
     * // Delete one Campanha
     * const Campanha = await prisma.campanha.delete({
     *   where: {
     *     // ... filter to delete one Campanha
     *   }
     * })
     * 
     */
    delete<T extends CampanhaDeleteArgs>(args: SelectSubset<T, CampanhaDeleteArgs<ExtArgs>>): Prisma__CampanhaClient<$Result.GetResult<Prisma.$CampanhaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Campanha.
     * @param {CampanhaUpdateArgs} args - Arguments to update one Campanha.
     * @example
     * // Update one Campanha
     * const campanha = await prisma.campanha.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CampanhaUpdateArgs>(args: SelectSubset<T, CampanhaUpdateArgs<ExtArgs>>): Prisma__CampanhaClient<$Result.GetResult<Prisma.$CampanhaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Campanhas.
     * @param {CampanhaDeleteManyArgs} args - Arguments to filter Campanhas to delete.
     * @example
     * // Delete a few Campanhas
     * const { count } = await prisma.campanha.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CampanhaDeleteManyArgs>(args?: SelectSubset<T, CampanhaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Campanhas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampanhaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Campanhas
     * const campanha = await prisma.campanha.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CampanhaUpdateManyArgs>(args: SelectSubset<T, CampanhaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Campanhas and returns the data updated in the database.
     * @param {CampanhaUpdateManyAndReturnArgs} args - Arguments to update many Campanhas.
     * @example
     * // Update many Campanhas
     * const campanha = await prisma.campanha.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Campanhas and only return the `id`
     * const campanhaWithIdOnly = await prisma.campanha.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CampanhaUpdateManyAndReturnArgs>(args: SelectSubset<T, CampanhaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampanhaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Campanha.
     * @param {CampanhaUpsertArgs} args - Arguments to update or create a Campanha.
     * @example
     * // Update or create a Campanha
     * const campanha = await prisma.campanha.upsert({
     *   create: {
     *     // ... data to create a Campanha
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Campanha we want to update
     *   }
     * })
     */
    upsert<T extends CampanhaUpsertArgs>(args: SelectSubset<T, CampanhaUpsertArgs<ExtArgs>>): Prisma__CampanhaClient<$Result.GetResult<Prisma.$CampanhaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Campanhas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampanhaCountArgs} args - Arguments to filter Campanhas to count.
     * @example
     * // Count the number of Campanhas
     * const count = await prisma.campanha.count({
     *   where: {
     *     // ... the filter for the Campanhas we want to count
     *   }
     * })
    **/
    count<T extends CampanhaCountArgs>(
      args?: Subset<T, CampanhaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CampanhaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Campanha.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampanhaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CampanhaAggregateArgs>(args: Subset<T, CampanhaAggregateArgs>): Prisma.PrismaPromise<GetCampanhaAggregateType<T>>

    /**
     * Group by Campanha.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampanhaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CampanhaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CampanhaGroupByArgs['orderBy'] }
        : { orderBy?: CampanhaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CampanhaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCampanhaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Campanha model
   */
  readonly fields: CampanhaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Campanha.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CampanhaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    instituicao<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    doacoes<T extends Campanha$doacoesArgs<ExtArgs> = {}>(args?: Subset<T, Campanha$doacoesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoacaoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Campanha model
   */
  interface CampanhaFieldRefs {
    readonly id: FieldRef<"Campanha", 'String'>
    readonly titulo: FieldRef<"Campanha", 'String'>
    readonly descricao: FieldRef<"Campanha", 'String'>
    readonly localizacao: FieldRef<"Campanha", 'String'>
    readonly data_inicio: FieldRef<"Campanha", 'DateTime'>
    readonly data_fim: FieldRef<"Campanha", 'DateTime'>
    readonly instituicao_id: FieldRef<"Campanha", 'String'>
    readonly created_at: FieldRef<"Campanha", 'DateTime'>
    readonly updated_at: FieldRef<"Campanha", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Campanha findUnique
   */
  export type CampanhaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campanha
     */
    select?: CampanhaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campanha
     */
    omit?: CampanhaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampanhaInclude<ExtArgs> | null
    /**
     * Filter, which Campanha to fetch.
     */
    where: CampanhaWhereUniqueInput
  }

  /**
   * Campanha findUniqueOrThrow
   */
  export type CampanhaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campanha
     */
    select?: CampanhaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campanha
     */
    omit?: CampanhaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampanhaInclude<ExtArgs> | null
    /**
     * Filter, which Campanha to fetch.
     */
    where: CampanhaWhereUniqueInput
  }

  /**
   * Campanha findFirst
   */
  export type CampanhaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campanha
     */
    select?: CampanhaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campanha
     */
    omit?: CampanhaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampanhaInclude<ExtArgs> | null
    /**
     * Filter, which Campanha to fetch.
     */
    where?: CampanhaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Campanhas to fetch.
     */
    orderBy?: CampanhaOrderByWithRelationInput | CampanhaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Campanhas.
     */
    cursor?: CampanhaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Campanhas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Campanhas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Campanhas.
     */
    distinct?: CampanhaScalarFieldEnum | CampanhaScalarFieldEnum[]
  }

  /**
   * Campanha findFirstOrThrow
   */
  export type CampanhaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campanha
     */
    select?: CampanhaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campanha
     */
    omit?: CampanhaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampanhaInclude<ExtArgs> | null
    /**
     * Filter, which Campanha to fetch.
     */
    where?: CampanhaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Campanhas to fetch.
     */
    orderBy?: CampanhaOrderByWithRelationInput | CampanhaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Campanhas.
     */
    cursor?: CampanhaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Campanhas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Campanhas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Campanhas.
     */
    distinct?: CampanhaScalarFieldEnum | CampanhaScalarFieldEnum[]
  }

  /**
   * Campanha findMany
   */
  export type CampanhaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campanha
     */
    select?: CampanhaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campanha
     */
    omit?: CampanhaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampanhaInclude<ExtArgs> | null
    /**
     * Filter, which Campanhas to fetch.
     */
    where?: CampanhaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Campanhas to fetch.
     */
    orderBy?: CampanhaOrderByWithRelationInput | CampanhaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Campanhas.
     */
    cursor?: CampanhaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Campanhas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Campanhas.
     */
    skip?: number
    distinct?: CampanhaScalarFieldEnum | CampanhaScalarFieldEnum[]
  }

  /**
   * Campanha create
   */
  export type CampanhaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campanha
     */
    select?: CampanhaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campanha
     */
    omit?: CampanhaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampanhaInclude<ExtArgs> | null
    /**
     * The data needed to create a Campanha.
     */
    data: XOR<CampanhaCreateInput, CampanhaUncheckedCreateInput>
  }

  /**
   * Campanha createMany
   */
  export type CampanhaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Campanhas.
     */
    data: CampanhaCreateManyInput | CampanhaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Campanha createManyAndReturn
   */
  export type CampanhaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campanha
     */
    select?: CampanhaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Campanha
     */
    omit?: CampanhaOmit<ExtArgs> | null
    /**
     * The data used to create many Campanhas.
     */
    data: CampanhaCreateManyInput | CampanhaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampanhaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Campanha update
   */
  export type CampanhaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campanha
     */
    select?: CampanhaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campanha
     */
    omit?: CampanhaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampanhaInclude<ExtArgs> | null
    /**
     * The data needed to update a Campanha.
     */
    data: XOR<CampanhaUpdateInput, CampanhaUncheckedUpdateInput>
    /**
     * Choose, which Campanha to update.
     */
    where: CampanhaWhereUniqueInput
  }

  /**
   * Campanha updateMany
   */
  export type CampanhaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Campanhas.
     */
    data: XOR<CampanhaUpdateManyMutationInput, CampanhaUncheckedUpdateManyInput>
    /**
     * Filter which Campanhas to update
     */
    where?: CampanhaWhereInput
    /**
     * Limit how many Campanhas to update.
     */
    limit?: number
  }

  /**
   * Campanha updateManyAndReturn
   */
  export type CampanhaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campanha
     */
    select?: CampanhaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Campanha
     */
    omit?: CampanhaOmit<ExtArgs> | null
    /**
     * The data used to update Campanhas.
     */
    data: XOR<CampanhaUpdateManyMutationInput, CampanhaUncheckedUpdateManyInput>
    /**
     * Filter which Campanhas to update
     */
    where?: CampanhaWhereInput
    /**
     * Limit how many Campanhas to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampanhaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Campanha upsert
   */
  export type CampanhaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campanha
     */
    select?: CampanhaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campanha
     */
    omit?: CampanhaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampanhaInclude<ExtArgs> | null
    /**
     * The filter to search for the Campanha to update in case it exists.
     */
    where: CampanhaWhereUniqueInput
    /**
     * In case the Campanha found by the `where` argument doesn't exist, create a new Campanha with this data.
     */
    create: XOR<CampanhaCreateInput, CampanhaUncheckedCreateInput>
    /**
     * In case the Campanha was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CampanhaUpdateInput, CampanhaUncheckedUpdateInput>
  }

  /**
   * Campanha delete
   */
  export type CampanhaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campanha
     */
    select?: CampanhaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campanha
     */
    omit?: CampanhaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampanhaInclude<ExtArgs> | null
    /**
     * Filter which Campanha to delete.
     */
    where: CampanhaWhereUniqueInput
  }

  /**
   * Campanha deleteMany
   */
  export type CampanhaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Campanhas to delete
     */
    where?: CampanhaWhereInput
    /**
     * Limit how many Campanhas to delete.
     */
    limit?: number
  }

  /**
   * Campanha.doacoes
   */
  export type Campanha$doacoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doacao
     */
    select?: DoacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doacao
     */
    omit?: DoacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoacaoInclude<ExtArgs> | null
    where?: DoacaoWhereInput
    orderBy?: DoacaoOrderByWithRelationInput | DoacaoOrderByWithRelationInput[]
    cursor?: DoacaoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DoacaoScalarFieldEnum | DoacaoScalarFieldEnum[]
  }

  /**
   * Campanha without action
   */
  export type CampanhaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campanha
     */
    select?: CampanhaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campanha
     */
    omit?: CampanhaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampanhaInclude<ExtArgs> | null
  }


  /**
   * Model Doacao
   */

  export type AggregateDoacao = {
    _count: DoacaoCountAggregateOutputType | null
    _avg: DoacaoAvgAggregateOutputType | null
    _sum: DoacaoSumAggregateOutputType | null
    _min: DoacaoMinAggregateOutputType | null
    _max: DoacaoMaxAggregateOutputType | null
  }

  export type DoacaoAvgAggregateOutputType = {
    quantidade: number | null
  }

  export type DoacaoSumAggregateOutputType = {
    quantidade: number | null
  }

  export type DoacaoMinAggregateOutputType = {
    id: string | null
    descricao: string | null
    quantidade: number | null
    foto_url: string | null
    campanha_id: string | null
    doador_id: string | null
    data_doacao: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type DoacaoMaxAggregateOutputType = {
    id: string | null
    descricao: string | null
    quantidade: number | null
    foto_url: string | null
    campanha_id: string | null
    doador_id: string | null
    data_doacao: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type DoacaoCountAggregateOutputType = {
    id: number
    descricao: number
    quantidade: number
    foto_url: number
    campanha_id: number
    doador_id: number
    data_doacao: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type DoacaoAvgAggregateInputType = {
    quantidade?: true
  }

  export type DoacaoSumAggregateInputType = {
    quantidade?: true
  }

  export type DoacaoMinAggregateInputType = {
    id?: true
    descricao?: true
    quantidade?: true
    foto_url?: true
    campanha_id?: true
    doador_id?: true
    data_doacao?: true
    created_at?: true
    updated_at?: true
  }

  export type DoacaoMaxAggregateInputType = {
    id?: true
    descricao?: true
    quantidade?: true
    foto_url?: true
    campanha_id?: true
    doador_id?: true
    data_doacao?: true
    created_at?: true
    updated_at?: true
  }

  export type DoacaoCountAggregateInputType = {
    id?: true
    descricao?: true
    quantidade?: true
    foto_url?: true
    campanha_id?: true
    doador_id?: true
    data_doacao?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type DoacaoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Doacao to aggregate.
     */
    where?: DoacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Doacaos to fetch.
     */
    orderBy?: DoacaoOrderByWithRelationInput | DoacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DoacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Doacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Doacaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Doacaos
    **/
    _count?: true | DoacaoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DoacaoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DoacaoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DoacaoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DoacaoMaxAggregateInputType
  }

  export type GetDoacaoAggregateType<T extends DoacaoAggregateArgs> = {
        [P in keyof T & keyof AggregateDoacao]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDoacao[P]>
      : GetScalarType<T[P], AggregateDoacao[P]>
  }




  export type DoacaoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DoacaoWhereInput
    orderBy?: DoacaoOrderByWithAggregationInput | DoacaoOrderByWithAggregationInput[]
    by: DoacaoScalarFieldEnum[] | DoacaoScalarFieldEnum
    having?: DoacaoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DoacaoCountAggregateInputType | true
    _avg?: DoacaoAvgAggregateInputType
    _sum?: DoacaoSumAggregateInputType
    _min?: DoacaoMinAggregateInputType
    _max?: DoacaoMaxAggregateInputType
  }

  export type DoacaoGroupByOutputType = {
    id: string
    descricao: string
    quantidade: number
    foto_url: string | null
    campanha_id: string
    doador_id: string
    data_doacao: Date
    created_at: Date
    updated_at: Date
    _count: DoacaoCountAggregateOutputType | null
    _avg: DoacaoAvgAggregateOutputType | null
    _sum: DoacaoSumAggregateOutputType | null
    _min: DoacaoMinAggregateOutputType | null
    _max: DoacaoMaxAggregateOutputType | null
  }

  type GetDoacaoGroupByPayload<T extends DoacaoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DoacaoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DoacaoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DoacaoGroupByOutputType[P]>
            : GetScalarType<T[P], DoacaoGroupByOutputType[P]>
        }
      >
    >


  export type DoacaoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    descricao?: boolean
    quantidade?: boolean
    foto_url?: boolean
    campanha_id?: boolean
    doador_id?: boolean
    data_doacao?: boolean
    created_at?: boolean
    updated_at?: boolean
    campanha?: boolean | CampanhaDefaultArgs<ExtArgs>
    doador?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["doacao"]>

  export type DoacaoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    descricao?: boolean
    quantidade?: boolean
    foto_url?: boolean
    campanha_id?: boolean
    doador_id?: boolean
    data_doacao?: boolean
    created_at?: boolean
    updated_at?: boolean
    campanha?: boolean | CampanhaDefaultArgs<ExtArgs>
    doador?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["doacao"]>

  export type DoacaoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    descricao?: boolean
    quantidade?: boolean
    foto_url?: boolean
    campanha_id?: boolean
    doador_id?: boolean
    data_doacao?: boolean
    created_at?: boolean
    updated_at?: boolean
    campanha?: boolean | CampanhaDefaultArgs<ExtArgs>
    doador?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["doacao"]>

  export type DoacaoSelectScalar = {
    id?: boolean
    descricao?: boolean
    quantidade?: boolean
    foto_url?: boolean
    campanha_id?: boolean
    doador_id?: boolean
    data_doacao?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type DoacaoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "descricao" | "quantidade" | "foto_url" | "campanha_id" | "doador_id" | "data_doacao" | "created_at" | "updated_at", ExtArgs["result"]["doacao"]>
  export type DoacaoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campanha?: boolean | CampanhaDefaultArgs<ExtArgs>
    doador?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type DoacaoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campanha?: boolean | CampanhaDefaultArgs<ExtArgs>
    doador?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type DoacaoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campanha?: boolean | CampanhaDefaultArgs<ExtArgs>
    doador?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $DoacaoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Doacao"
    objects: {
      campanha: Prisma.$CampanhaPayload<ExtArgs>
      doador: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      descricao: string
      quantidade: number
      foto_url: string | null
      campanha_id: string
      doador_id: string
      data_doacao: Date
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["doacao"]>
    composites: {}
  }

  type DoacaoGetPayload<S extends boolean | null | undefined | DoacaoDefaultArgs> = $Result.GetResult<Prisma.$DoacaoPayload, S>

  type DoacaoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DoacaoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DoacaoCountAggregateInputType | true
    }

  export interface DoacaoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Doacao'], meta: { name: 'Doacao' } }
    /**
     * Find zero or one Doacao that matches the filter.
     * @param {DoacaoFindUniqueArgs} args - Arguments to find a Doacao
     * @example
     * // Get one Doacao
     * const doacao = await prisma.doacao.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DoacaoFindUniqueArgs>(args: SelectSubset<T, DoacaoFindUniqueArgs<ExtArgs>>): Prisma__DoacaoClient<$Result.GetResult<Prisma.$DoacaoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Doacao that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DoacaoFindUniqueOrThrowArgs} args - Arguments to find a Doacao
     * @example
     * // Get one Doacao
     * const doacao = await prisma.doacao.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DoacaoFindUniqueOrThrowArgs>(args: SelectSubset<T, DoacaoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DoacaoClient<$Result.GetResult<Prisma.$DoacaoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Doacao that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoacaoFindFirstArgs} args - Arguments to find a Doacao
     * @example
     * // Get one Doacao
     * const doacao = await prisma.doacao.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DoacaoFindFirstArgs>(args?: SelectSubset<T, DoacaoFindFirstArgs<ExtArgs>>): Prisma__DoacaoClient<$Result.GetResult<Prisma.$DoacaoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Doacao that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoacaoFindFirstOrThrowArgs} args - Arguments to find a Doacao
     * @example
     * // Get one Doacao
     * const doacao = await prisma.doacao.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DoacaoFindFirstOrThrowArgs>(args?: SelectSubset<T, DoacaoFindFirstOrThrowArgs<ExtArgs>>): Prisma__DoacaoClient<$Result.GetResult<Prisma.$DoacaoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Doacaos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoacaoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Doacaos
     * const doacaos = await prisma.doacao.findMany()
     * 
     * // Get first 10 Doacaos
     * const doacaos = await prisma.doacao.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const doacaoWithIdOnly = await prisma.doacao.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DoacaoFindManyArgs>(args?: SelectSubset<T, DoacaoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoacaoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Doacao.
     * @param {DoacaoCreateArgs} args - Arguments to create a Doacao.
     * @example
     * // Create one Doacao
     * const Doacao = await prisma.doacao.create({
     *   data: {
     *     // ... data to create a Doacao
     *   }
     * })
     * 
     */
    create<T extends DoacaoCreateArgs>(args: SelectSubset<T, DoacaoCreateArgs<ExtArgs>>): Prisma__DoacaoClient<$Result.GetResult<Prisma.$DoacaoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Doacaos.
     * @param {DoacaoCreateManyArgs} args - Arguments to create many Doacaos.
     * @example
     * // Create many Doacaos
     * const doacao = await prisma.doacao.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DoacaoCreateManyArgs>(args?: SelectSubset<T, DoacaoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Doacaos and returns the data saved in the database.
     * @param {DoacaoCreateManyAndReturnArgs} args - Arguments to create many Doacaos.
     * @example
     * // Create many Doacaos
     * const doacao = await prisma.doacao.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Doacaos and only return the `id`
     * const doacaoWithIdOnly = await prisma.doacao.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DoacaoCreateManyAndReturnArgs>(args?: SelectSubset<T, DoacaoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoacaoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Doacao.
     * @param {DoacaoDeleteArgs} args - Arguments to delete one Doacao.
     * @example
     * // Delete one Doacao
     * const Doacao = await prisma.doacao.delete({
     *   where: {
     *     // ... filter to delete one Doacao
     *   }
     * })
     * 
     */
    delete<T extends DoacaoDeleteArgs>(args: SelectSubset<T, DoacaoDeleteArgs<ExtArgs>>): Prisma__DoacaoClient<$Result.GetResult<Prisma.$DoacaoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Doacao.
     * @param {DoacaoUpdateArgs} args - Arguments to update one Doacao.
     * @example
     * // Update one Doacao
     * const doacao = await prisma.doacao.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DoacaoUpdateArgs>(args: SelectSubset<T, DoacaoUpdateArgs<ExtArgs>>): Prisma__DoacaoClient<$Result.GetResult<Prisma.$DoacaoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Doacaos.
     * @param {DoacaoDeleteManyArgs} args - Arguments to filter Doacaos to delete.
     * @example
     * // Delete a few Doacaos
     * const { count } = await prisma.doacao.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DoacaoDeleteManyArgs>(args?: SelectSubset<T, DoacaoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Doacaos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoacaoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Doacaos
     * const doacao = await prisma.doacao.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DoacaoUpdateManyArgs>(args: SelectSubset<T, DoacaoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Doacaos and returns the data updated in the database.
     * @param {DoacaoUpdateManyAndReturnArgs} args - Arguments to update many Doacaos.
     * @example
     * // Update many Doacaos
     * const doacao = await prisma.doacao.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Doacaos and only return the `id`
     * const doacaoWithIdOnly = await prisma.doacao.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DoacaoUpdateManyAndReturnArgs>(args: SelectSubset<T, DoacaoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoacaoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Doacao.
     * @param {DoacaoUpsertArgs} args - Arguments to update or create a Doacao.
     * @example
     * // Update or create a Doacao
     * const doacao = await prisma.doacao.upsert({
     *   create: {
     *     // ... data to create a Doacao
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Doacao we want to update
     *   }
     * })
     */
    upsert<T extends DoacaoUpsertArgs>(args: SelectSubset<T, DoacaoUpsertArgs<ExtArgs>>): Prisma__DoacaoClient<$Result.GetResult<Prisma.$DoacaoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Doacaos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoacaoCountArgs} args - Arguments to filter Doacaos to count.
     * @example
     * // Count the number of Doacaos
     * const count = await prisma.doacao.count({
     *   where: {
     *     // ... the filter for the Doacaos we want to count
     *   }
     * })
    **/
    count<T extends DoacaoCountArgs>(
      args?: Subset<T, DoacaoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DoacaoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Doacao.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoacaoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DoacaoAggregateArgs>(args: Subset<T, DoacaoAggregateArgs>): Prisma.PrismaPromise<GetDoacaoAggregateType<T>>

    /**
     * Group by Doacao.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoacaoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DoacaoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DoacaoGroupByArgs['orderBy'] }
        : { orderBy?: DoacaoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DoacaoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDoacaoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Doacao model
   */
  readonly fields: DoacaoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Doacao.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DoacaoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    campanha<T extends CampanhaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CampanhaDefaultArgs<ExtArgs>>): Prisma__CampanhaClient<$Result.GetResult<Prisma.$CampanhaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    doador<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Doacao model
   */
  interface DoacaoFieldRefs {
    readonly id: FieldRef<"Doacao", 'String'>
    readonly descricao: FieldRef<"Doacao", 'String'>
    readonly quantidade: FieldRef<"Doacao", 'Int'>
    readonly foto_url: FieldRef<"Doacao", 'String'>
    readonly campanha_id: FieldRef<"Doacao", 'String'>
    readonly doador_id: FieldRef<"Doacao", 'String'>
    readonly data_doacao: FieldRef<"Doacao", 'DateTime'>
    readonly created_at: FieldRef<"Doacao", 'DateTime'>
    readonly updated_at: FieldRef<"Doacao", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Doacao findUnique
   */
  export type DoacaoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doacao
     */
    select?: DoacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doacao
     */
    omit?: DoacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoacaoInclude<ExtArgs> | null
    /**
     * Filter, which Doacao to fetch.
     */
    where: DoacaoWhereUniqueInput
  }

  /**
   * Doacao findUniqueOrThrow
   */
  export type DoacaoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doacao
     */
    select?: DoacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doacao
     */
    omit?: DoacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoacaoInclude<ExtArgs> | null
    /**
     * Filter, which Doacao to fetch.
     */
    where: DoacaoWhereUniqueInput
  }

  /**
   * Doacao findFirst
   */
  export type DoacaoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doacao
     */
    select?: DoacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doacao
     */
    omit?: DoacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoacaoInclude<ExtArgs> | null
    /**
     * Filter, which Doacao to fetch.
     */
    where?: DoacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Doacaos to fetch.
     */
    orderBy?: DoacaoOrderByWithRelationInput | DoacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Doacaos.
     */
    cursor?: DoacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Doacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Doacaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Doacaos.
     */
    distinct?: DoacaoScalarFieldEnum | DoacaoScalarFieldEnum[]
  }

  /**
   * Doacao findFirstOrThrow
   */
  export type DoacaoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doacao
     */
    select?: DoacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doacao
     */
    omit?: DoacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoacaoInclude<ExtArgs> | null
    /**
     * Filter, which Doacao to fetch.
     */
    where?: DoacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Doacaos to fetch.
     */
    orderBy?: DoacaoOrderByWithRelationInput | DoacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Doacaos.
     */
    cursor?: DoacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Doacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Doacaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Doacaos.
     */
    distinct?: DoacaoScalarFieldEnum | DoacaoScalarFieldEnum[]
  }

  /**
   * Doacao findMany
   */
  export type DoacaoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doacao
     */
    select?: DoacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doacao
     */
    omit?: DoacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoacaoInclude<ExtArgs> | null
    /**
     * Filter, which Doacaos to fetch.
     */
    where?: DoacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Doacaos to fetch.
     */
    orderBy?: DoacaoOrderByWithRelationInput | DoacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Doacaos.
     */
    cursor?: DoacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Doacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Doacaos.
     */
    skip?: number
    distinct?: DoacaoScalarFieldEnum | DoacaoScalarFieldEnum[]
  }

  /**
   * Doacao create
   */
  export type DoacaoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doacao
     */
    select?: DoacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doacao
     */
    omit?: DoacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoacaoInclude<ExtArgs> | null
    /**
     * The data needed to create a Doacao.
     */
    data: XOR<DoacaoCreateInput, DoacaoUncheckedCreateInput>
  }

  /**
   * Doacao createMany
   */
  export type DoacaoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Doacaos.
     */
    data: DoacaoCreateManyInput | DoacaoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Doacao createManyAndReturn
   */
  export type DoacaoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doacao
     */
    select?: DoacaoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Doacao
     */
    omit?: DoacaoOmit<ExtArgs> | null
    /**
     * The data used to create many Doacaos.
     */
    data: DoacaoCreateManyInput | DoacaoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoacaoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Doacao update
   */
  export type DoacaoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doacao
     */
    select?: DoacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doacao
     */
    omit?: DoacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoacaoInclude<ExtArgs> | null
    /**
     * The data needed to update a Doacao.
     */
    data: XOR<DoacaoUpdateInput, DoacaoUncheckedUpdateInput>
    /**
     * Choose, which Doacao to update.
     */
    where: DoacaoWhereUniqueInput
  }

  /**
   * Doacao updateMany
   */
  export type DoacaoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Doacaos.
     */
    data: XOR<DoacaoUpdateManyMutationInput, DoacaoUncheckedUpdateManyInput>
    /**
     * Filter which Doacaos to update
     */
    where?: DoacaoWhereInput
    /**
     * Limit how many Doacaos to update.
     */
    limit?: number
  }

  /**
   * Doacao updateManyAndReturn
   */
  export type DoacaoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doacao
     */
    select?: DoacaoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Doacao
     */
    omit?: DoacaoOmit<ExtArgs> | null
    /**
     * The data used to update Doacaos.
     */
    data: XOR<DoacaoUpdateManyMutationInput, DoacaoUncheckedUpdateManyInput>
    /**
     * Filter which Doacaos to update
     */
    where?: DoacaoWhereInput
    /**
     * Limit how many Doacaos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoacaoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Doacao upsert
   */
  export type DoacaoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doacao
     */
    select?: DoacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doacao
     */
    omit?: DoacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoacaoInclude<ExtArgs> | null
    /**
     * The filter to search for the Doacao to update in case it exists.
     */
    where: DoacaoWhereUniqueInput
    /**
     * In case the Doacao found by the `where` argument doesn't exist, create a new Doacao with this data.
     */
    create: XOR<DoacaoCreateInput, DoacaoUncheckedCreateInput>
    /**
     * In case the Doacao was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DoacaoUpdateInput, DoacaoUncheckedUpdateInput>
  }

  /**
   * Doacao delete
   */
  export type DoacaoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doacao
     */
    select?: DoacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doacao
     */
    omit?: DoacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoacaoInclude<ExtArgs> | null
    /**
     * Filter which Doacao to delete.
     */
    where: DoacaoWhereUniqueInput
  }

  /**
   * Doacao deleteMany
   */
  export type DoacaoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Doacaos to delete
     */
    where?: DoacaoWhereInput
    /**
     * Limit how many Doacaos to delete.
     */
    limit?: number
  }

  /**
   * Doacao without action
   */
  export type DoacaoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doacao
     */
    select?: DoacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doacao
     */
    omit?: DoacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoacaoInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    email: 'email',
    senha: 'senha',
    tipo: 'tipo',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CampanhaScalarFieldEnum: {
    id: 'id',
    titulo: 'titulo',
    descricao: 'descricao',
    localizacao: 'localizacao',
    data_inicio: 'data_inicio',
    data_fim: 'data_fim',
    instituicao_id: 'instituicao_id',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type CampanhaScalarFieldEnum = (typeof CampanhaScalarFieldEnum)[keyof typeof CampanhaScalarFieldEnum]


  export const DoacaoScalarFieldEnum: {
    id: 'id',
    descricao: 'descricao',
    quantidade: 'quantidade',
    foto_url: 'foto_url',
    campanha_id: 'campanha_id',
    doador_id: 'doador_id',
    data_doacao: 'data_doacao',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type DoacaoScalarFieldEnum = (typeof DoacaoScalarFieldEnum)[keyof typeof DoacaoScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'TipoUsuario'
   */
  export type EnumTipoUsuarioFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipoUsuario'>
    


  /**
   * Reference to a field of type 'TipoUsuario[]'
   */
  export type ListEnumTipoUsuarioFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipoUsuario[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    nome?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    senha?: StringFilter<"User"> | string
    tipo?: EnumTipoUsuarioFilter<"User"> | $Enums.TipoUsuario
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    campanhas?: CampanhaListRelationFilter
    doacoes?: DoacaoListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    tipo?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    campanhas?: CampanhaOrderByRelationAggregateInput
    doacoes?: DoacaoOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    nome?: StringFilter<"User"> | string
    senha?: StringFilter<"User"> | string
    tipo?: EnumTipoUsuarioFilter<"User"> | $Enums.TipoUsuario
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    campanhas?: CampanhaListRelationFilter
    doacoes?: DoacaoListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    tipo?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    nome?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    senha?: StringWithAggregatesFilter<"User"> | string
    tipo?: EnumTipoUsuarioWithAggregatesFilter<"User"> | $Enums.TipoUsuario
    created_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type CampanhaWhereInput = {
    AND?: CampanhaWhereInput | CampanhaWhereInput[]
    OR?: CampanhaWhereInput[]
    NOT?: CampanhaWhereInput | CampanhaWhereInput[]
    id?: StringFilter<"Campanha"> | string
    titulo?: StringFilter<"Campanha"> | string
    descricao?: StringFilter<"Campanha"> | string
    localizacao?: StringFilter<"Campanha"> | string
    data_inicio?: DateTimeFilter<"Campanha"> | Date | string
    data_fim?: DateTimeFilter<"Campanha"> | Date | string
    instituicao_id?: StringFilter<"Campanha"> | string
    created_at?: DateTimeFilter<"Campanha"> | Date | string
    updated_at?: DateTimeFilter<"Campanha"> | Date | string
    instituicao?: XOR<UserScalarRelationFilter, UserWhereInput>
    doacoes?: DoacaoListRelationFilter
  }

  export type CampanhaOrderByWithRelationInput = {
    id?: SortOrder
    titulo?: SortOrder
    descricao?: SortOrder
    localizacao?: SortOrder
    data_inicio?: SortOrder
    data_fim?: SortOrder
    instituicao_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    instituicao?: UserOrderByWithRelationInput
    doacoes?: DoacaoOrderByRelationAggregateInput
  }

  export type CampanhaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CampanhaWhereInput | CampanhaWhereInput[]
    OR?: CampanhaWhereInput[]
    NOT?: CampanhaWhereInput | CampanhaWhereInput[]
    titulo?: StringFilter<"Campanha"> | string
    descricao?: StringFilter<"Campanha"> | string
    localizacao?: StringFilter<"Campanha"> | string
    data_inicio?: DateTimeFilter<"Campanha"> | Date | string
    data_fim?: DateTimeFilter<"Campanha"> | Date | string
    instituicao_id?: StringFilter<"Campanha"> | string
    created_at?: DateTimeFilter<"Campanha"> | Date | string
    updated_at?: DateTimeFilter<"Campanha"> | Date | string
    instituicao?: XOR<UserScalarRelationFilter, UserWhereInput>
    doacoes?: DoacaoListRelationFilter
  }, "id">

  export type CampanhaOrderByWithAggregationInput = {
    id?: SortOrder
    titulo?: SortOrder
    descricao?: SortOrder
    localizacao?: SortOrder
    data_inicio?: SortOrder
    data_fim?: SortOrder
    instituicao_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: CampanhaCountOrderByAggregateInput
    _max?: CampanhaMaxOrderByAggregateInput
    _min?: CampanhaMinOrderByAggregateInput
  }

  export type CampanhaScalarWhereWithAggregatesInput = {
    AND?: CampanhaScalarWhereWithAggregatesInput | CampanhaScalarWhereWithAggregatesInput[]
    OR?: CampanhaScalarWhereWithAggregatesInput[]
    NOT?: CampanhaScalarWhereWithAggregatesInput | CampanhaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Campanha"> | string
    titulo?: StringWithAggregatesFilter<"Campanha"> | string
    descricao?: StringWithAggregatesFilter<"Campanha"> | string
    localizacao?: StringWithAggregatesFilter<"Campanha"> | string
    data_inicio?: DateTimeWithAggregatesFilter<"Campanha"> | Date | string
    data_fim?: DateTimeWithAggregatesFilter<"Campanha"> | Date | string
    instituicao_id?: StringWithAggregatesFilter<"Campanha"> | string
    created_at?: DateTimeWithAggregatesFilter<"Campanha"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Campanha"> | Date | string
  }

  export type DoacaoWhereInput = {
    AND?: DoacaoWhereInput | DoacaoWhereInput[]
    OR?: DoacaoWhereInput[]
    NOT?: DoacaoWhereInput | DoacaoWhereInput[]
    id?: StringFilter<"Doacao"> | string
    descricao?: StringFilter<"Doacao"> | string
    quantidade?: IntFilter<"Doacao"> | number
    foto_url?: StringNullableFilter<"Doacao"> | string | null
    campanha_id?: StringFilter<"Doacao"> | string
    doador_id?: StringFilter<"Doacao"> | string
    data_doacao?: DateTimeFilter<"Doacao"> | Date | string
    created_at?: DateTimeFilter<"Doacao"> | Date | string
    updated_at?: DateTimeFilter<"Doacao"> | Date | string
    campanha?: XOR<CampanhaScalarRelationFilter, CampanhaWhereInput>
    doador?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type DoacaoOrderByWithRelationInput = {
    id?: SortOrder
    descricao?: SortOrder
    quantidade?: SortOrder
    foto_url?: SortOrderInput | SortOrder
    campanha_id?: SortOrder
    doador_id?: SortOrder
    data_doacao?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    campanha?: CampanhaOrderByWithRelationInput
    doador?: UserOrderByWithRelationInput
  }

  export type DoacaoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DoacaoWhereInput | DoacaoWhereInput[]
    OR?: DoacaoWhereInput[]
    NOT?: DoacaoWhereInput | DoacaoWhereInput[]
    descricao?: StringFilter<"Doacao"> | string
    quantidade?: IntFilter<"Doacao"> | number
    foto_url?: StringNullableFilter<"Doacao"> | string | null
    campanha_id?: StringFilter<"Doacao"> | string
    doador_id?: StringFilter<"Doacao"> | string
    data_doacao?: DateTimeFilter<"Doacao"> | Date | string
    created_at?: DateTimeFilter<"Doacao"> | Date | string
    updated_at?: DateTimeFilter<"Doacao"> | Date | string
    campanha?: XOR<CampanhaScalarRelationFilter, CampanhaWhereInput>
    doador?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type DoacaoOrderByWithAggregationInput = {
    id?: SortOrder
    descricao?: SortOrder
    quantidade?: SortOrder
    foto_url?: SortOrderInput | SortOrder
    campanha_id?: SortOrder
    doador_id?: SortOrder
    data_doacao?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: DoacaoCountOrderByAggregateInput
    _avg?: DoacaoAvgOrderByAggregateInput
    _max?: DoacaoMaxOrderByAggregateInput
    _min?: DoacaoMinOrderByAggregateInput
    _sum?: DoacaoSumOrderByAggregateInput
  }

  export type DoacaoScalarWhereWithAggregatesInput = {
    AND?: DoacaoScalarWhereWithAggregatesInput | DoacaoScalarWhereWithAggregatesInput[]
    OR?: DoacaoScalarWhereWithAggregatesInput[]
    NOT?: DoacaoScalarWhereWithAggregatesInput | DoacaoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Doacao"> | string
    descricao?: StringWithAggregatesFilter<"Doacao"> | string
    quantidade?: IntWithAggregatesFilter<"Doacao"> | number
    foto_url?: StringNullableWithAggregatesFilter<"Doacao"> | string | null
    campanha_id?: StringWithAggregatesFilter<"Doacao"> | string
    doador_id?: StringWithAggregatesFilter<"Doacao"> | string
    data_doacao?: DateTimeWithAggregatesFilter<"Doacao"> | Date | string
    created_at?: DateTimeWithAggregatesFilter<"Doacao"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Doacao"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    nome: string
    email: string
    senha: string
    tipo: $Enums.TipoUsuario
    created_at?: Date | string
    updated_at?: Date | string
    campanhas?: CampanhaCreateNestedManyWithoutInstituicaoInput
    doacoes?: DoacaoCreateNestedManyWithoutDoadorInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    nome: string
    email: string
    senha: string
    tipo: $Enums.TipoUsuario
    created_at?: Date | string
    updated_at?: Date | string
    campanhas?: CampanhaUncheckedCreateNestedManyWithoutInstituicaoInput
    doacoes?: DoacaoUncheckedCreateNestedManyWithoutDoadorInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    campanhas?: CampanhaUpdateManyWithoutInstituicaoNestedInput
    doacoes?: DoacaoUpdateManyWithoutDoadorNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    campanhas?: CampanhaUncheckedUpdateManyWithoutInstituicaoNestedInput
    doacoes?: DoacaoUncheckedUpdateManyWithoutDoadorNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    nome: string
    email: string
    senha: string
    tipo: $Enums.TipoUsuario
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampanhaCreateInput = {
    id?: string
    titulo: string
    descricao: string
    localizacao: string
    data_inicio: Date | string
    data_fim: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    instituicao: UserCreateNestedOneWithoutCampanhasInput
    doacoes?: DoacaoCreateNestedManyWithoutCampanhaInput
  }

  export type CampanhaUncheckedCreateInput = {
    id?: string
    titulo: string
    descricao: string
    localizacao: string
    data_inicio: Date | string
    data_fim: Date | string
    instituicao_id: string
    created_at?: Date | string
    updated_at?: Date | string
    doacoes?: DoacaoUncheckedCreateNestedManyWithoutCampanhaInput
  }

  export type CampanhaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    localizacao?: StringFieldUpdateOperationsInput | string
    data_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    data_fim?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    instituicao?: UserUpdateOneRequiredWithoutCampanhasNestedInput
    doacoes?: DoacaoUpdateManyWithoutCampanhaNestedInput
  }

  export type CampanhaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    localizacao?: StringFieldUpdateOperationsInput | string
    data_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    data_fim?: DateTimeFieldUpdateOperationsInput | Date | string
    instituicao_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    doacoes?: DoacaoUncheckedUpdateManyWithoutCampanhaNestedInput
  }

  export type CampanhaCreateManyInput = {
    id?: string
    titulo: string
    descricao: string
    localizacao: string
    data_inicio: Date | string
    data_fim: Date | string
    instituicao_id: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type CampanhaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    localizacao?: StringFieldUpdateOperationsInput | string
    data_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    data_fim?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampanhaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    localizacao?: StringFieldUpdateOperationsInput | string
    data_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    data_fim?: DateTimeFieldUpdateOperationsInput | Date | string
    instituicao_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoacaoCreateInput = {
    id?: string
    descricao: string
    quantidade: number
    foto_url?: string | null
    data_doacao?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    campanha: CampanhaCreateNestedOneWithoutDoacoesInput
    doador: UserCreateNestedOneWithoutDoacoesInput
  }

  export type DoacaoUncheckedCreateInput = {
    id?: string
    descricao: string
    quantidade: number
    foto_url?: string | null
    campanha_id: string
    doador_id: string
    data_doacao?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type DoacaoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    foto_url?: NullableStringFieldUpdateOperationsInput | string | null
    data_doacao?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    campanha?: CampanhaUpdateOneRequiredWithoutDoacoesNestedInput
    doador?: UserUpdateOneRequiredWithoutDoacoesNestedInput
  }

  export type DoacaoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    foto_url?: NullableStringFieldUpdateOperationsInput | string | null
    campanha_id?: StringFieldUpdateOperationsInput | string
    doador_id?: StringFieldUpdateOperationsInput | string
    data_doacao?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoacaoCreateManyInput = {
    id?: string
    descricao: string
    quantidade: number
    foto_url?: string | null
    campanha_id: string
    doador_id: string
    data_doacao?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type DoacaoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    foto_url?: NullableStringFieldUpdateOperationsInput | string | null
    data_doacao?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoacaoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    foto_url?: NullableStringFieldUpdateOperationsInput | string | null
    campanha_id?: StringFieldUpdateOperationsInput | string
    doador_id?: StringFieldUpdateOperationsInput | string
    data_doacao?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumTipoUsuarioFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoUsuario | EnumTipoUsuarioFieldRefInput<$PrismaModel>
    in?: $Enums.TipoUsuario[] | ListEnumTipoUsuarioFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoUsuario[] | ListEnumTipoUsuarioFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoUsuarioFilter<$PrismaModel> | $Enums.TipoUsuario
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type CampanhaListRelationFilter = {
    every?: CampanhaWhereInput
    some?: CampanhaWhereInput
    none?: CampanhaWhereInput
  }

  export type DoacaoListRelationFilter = {
    every?: DoacaoWhereInput
    some?: DoacaoWhereInput
    none?: DoacaoWhereInput
  }

  export type CampanhaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DoacaoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    tipo?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    tipo?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    tipo?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumTipoUsuarioWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoUsuario | EnumTipoUsuarioFieldRefInput<$PrismaModel>
    in?: $Enums.TipoUsuario[] | ListEnumTipoUsuarioFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoUsuario[] | ListEnumTipoUsuarioFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoUsuarioWithAggregatesFilter<$PrismaModel> | $Enums.TipoUsuario
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipoUsuarioFilter<$PrismaModel>
    _max?: NestedEnumTipoUsuarioFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type CampanhaCountOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
    descricao?: SortOrder
    localizacao?: SortOrder
    data_inicio?: SortOrder
    data_fim?: SortOrder
    instituicao_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type CampanhaMaxOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
    descricao?: SortOrder
    localizacao?: SortOrder
    data_inicio?: SortOrder
    data_fim?: SortOrder
    instituicao_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type CampanhaMinOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
    descricao?: SortOrder
    localizacao?: SortOrder
    data_inicio?: SortOrder
    data_fim?: SortOrder
    instituicao_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type CampanhaScalarRelationFilter = {
    is?: CampanhaWhereInput
    isNot?: CampanhaWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type DoacaoCountOrderByAggregateInput = {
    id?: SortOrder
    descricao?: SortOrder
    quantidade?: SortOrder
    foto_url?: SortOrder
    campanha_id?: SortOrder
    doador_id?: SortOrder
    data_doacao?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type DoacaoAvgOrderByAggregateInput = {
    quantidade?: SortOrder
  }

  export type DoacaoMaxOrderByAggregateInput = {
    id?: SortOrder
    descricao?: SortOrder
    quantidade?: SortOrder
    foto_url?: SortOrder
    campanha_id?: SortOrder
    doador_id?: SortOrder
    data_doacao?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type DoacaoMinOrderByAggregateInput = {
    id?: SortOrder
    descricao?: SortOrder
    quantidade?: SortOrder
    foto_url?: SortOrder
    campanha_id?: SortOrder
    doador_id?: SortOrder
    data_doacao?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type DoacaoSumOrderByAggregateInput = {
    quantidade?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type CampanhaCreateNestedManyWithoutInstituicaoInput = {
    create?: XOR<CampanhaCreateWithoutInstituicaoInput, CampanhaUncheckedCreateWithoutInstituicaoInput> | CampanhaCreateWithoutInstituicaoInput[] | CampanhaUncheckedCreateWithoutInstituicaoInput[]
    connectOrCreate?: CampanhaCreateOrConnectWithoutInstituicaoInput | CampanhaCreateOrConnectWithoutInstituicaoInput[]
    createMany?: CampanhaCreateManyInstituicaoInputEnvelope
    connect?: CampanhaWhereUniqueInput | CampanhaWhereUniqueInput[]
  }

  export type DoacaoCreateNestedManyWithoutDoadorInput = {
    create?: XOR<DoacaoCreateWithoutDoadorInput, DoacaoUncheckedCreateWithoutDoadorInput> | DoacaoCreateWithoutDoadorInput[] | DoacaoUncheckedCreateWithoutDoadorInput[]
    connectOrCreate?: DoacaoCreateOrConnectWithoutDoadorInput | DoacaoCreateOrConnectWithoutDoadorInput[]
    createMany?: DoacaoCreateManyDoadorInputEnvelope
    connect?: DoacaoWhereUniqueInput | DoacaoWhereUniqueInput[]
  }

  export type CampanhaUncheckedCreateNestedManyWithoutInstituicaoInput = {
    create?: XOR<CampanhaCreateWithoutInstituicaoInput, CampanhaUncheckedCreateWithoutInstituicaoInput> | CampanhaCreateWithoutInstituicaoInput[] | CampanhaUncheckedCreateWithoutInstituicaoInput[]
    connectOrCreate?: CampanhaCreateOrConnectWithoutInstituicaoInput | CampanhaCreateOrConnectWithoutInstituicaoInput[]
    createMany?: CampanhaCreateManyInstituicaoInputEnvelope
    connect?: CampanhaWhereUniqueInput | CampanhaWhereUniqueInput[]
  }

  export type DoacaoUncheckedCreateNestedManyWithoutDoadorInput = {
    create?: XOR<DoacaoCreateWithoutDoadorInput, DoacaoUncheckedCreateWithoutDoadorInput> | DoacaoCreateWithoutDoadorInput[] | DoacaoUncheckedCreateWithoutDoadorInput[]
    connectOrCreate?: DoacaoCreateOrConnectWithoutDoadorInput | DoacaoCreateOrConnectWithoutDoadorInput[]
    createMany?: DoacaoCreateManyDoadorInputEnvelope
    connect?: DoacaoWhereUniqueInput | DoacaoWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumTipoUsuarioFieldUpdateOperationsInput = {
    set?: $Enums.TipoUsuario
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type CampanhaUpdateManyWithoutInstituicaoNestedInput = {
    create?: XOR<CampanhaCreateWithoutInstituicaoInput, CampanhaUncheckedCreateWithoutInstituicaoInput> | CampanhaCreateWithoutInstituicaoInput[] | CampanhaUncheckedCreateWithoutInstituicaoInput[]
    connectOrCreate?: CampanhaCreateOrConnectWithoutInstituicaoInput | CampanhaCreateOrConnectWithoutInstituicaoInput[]
    upsert?: CampanhaUpsertWithWhereUniqueWithoutInstituicaoInput | CampanhaUpsertWithWhereUniqueWithoutInstituicaoInput[]
    createMany?: CampanhaCreateManyInstituicaoInputEnvelope
    set?: CampanhaWhereUniqueInput | CampanhaWhereUniqueInput[]
    disconnect?: CampanhaWhereUniqueInput | CampanhaWhereUniqueInput[]
    delete?: CampanhaWhereUniqueInput | CampanhaWhereUniqueInput[]
    connect?: CampanhaWhereUniqueInput | CampanhaWhereUniqueInput[]
    update?: CampanhaUpdateWithWhereUniqueWithoutInstituicaoInput | CampanhaUpdateWithWhereUniqueWithoutInstituicaoInput[]
    updateMany?: CampanhaUpdateManyWithWhereWithoutInstituicaoInput | CampanhaUpdateManyWithWhereWithoutInstituicaoInput[]
    deleteMany?: CampanhaScalarWhereInput | CampanhaScalarWhereInput[]
  }

  export type DoacaoUpdateManyWithoutDoadorNestedInput = {
    create?: XOR<DoacaoCreateWithoutDoadorInput, DoacaoUncheckedCreateWithoutDoadorInput> | DoacaoCreateWithoutDoadorInput[] | DoacaoUncheckedCreateWithoutDoadorInput[]
    connectOrCreate?: DoacaoCreateOrConnectWithoutDoadorInput | DoacaoCreateOrConnectWithoutDoadorInput[]
    upsert?: DoacaoUpsertWithWhereUniqueWithoutDoadorInput | DoacaoUpsertWithWhereUniqueWithoutDoadorInput[]
    createMany?: DoacaoCreateManyDoadorInputEnvelope
    set?: DoacaoWhereUniqueInput | DoacaoWhereUniqueInput[]
    disconnect?: DoacaoWhereUniqueInput | DoacaoWhereUniqueInput[]
    delete?: DoacaoWhereUniqueInput | DoacaoWhereUniqueInput[]
    connect?: DoacaoWhereUniqueInput | DoacaoWhereUniqueInput[]
    update?: DoacaoUpdateWithWhereUniqueWithoutDoadorInput | DoacaoUpdateWithWhereUniqueWithoutDoadorInput[]
    updateMany?: DoacaoUpdateManyWithWhereWithoutDoadorInput | DoacaoUpdateManyWithWhereWithoutDoadorInput[]
    deleteMany?: DoacaoScalarWhereInput | DoacaoScalarWhereInput[]
  }

  export type CampanhaUncheckedUpdateManyWithoutInstituicaoNestedInput = {
    create?: XOR<CampanhaCreateWithoutInstituicaoInput, CampanhaUncheckedCreateWithoutInstituicaoInput> | CampanhaCreateWithoutInstituicaoInput[] | CampanhaUncheckedCreateWithoutInstituicaoInput[]
    connectOrCreate?: CampanhaCreateOrConnectWithoutInstituicaoInput | CampanhaCreateOrConnectWithoutInstituicaoInput[]
    upsert?: CampanhaUpsertWithWhereUniqueWithoutInstituicaoInput | CampanhaUpsertWithWhereUniqueWithoutInstituicaoInput[]
    createMany?: CampanhaCreateManyInstituicaoInputEnvelope
    set?: CampanhaWhereUniqueInput | CampanhaWhereUniqueInput[]
    disconnect?: CampanhaWhereUniqueInput | CampanhaWhereUniqueInput[]
    delete?: CampanhaWhereUniqueInput | CampanhaWhereUniqueInput[]
    connect?: CampanhaWhereUniqueInput | CampanhaWhereUniqueInput[]
    update?: CampanhaUpdateWithWhereUniqueWithoutInstituicaoInput | CampanhaUpdateWithWhereUniqueWithoutInstituicaoInput[]
    updateMany?: CampanhaUpdateManyWithWhereWithoutInstituicaoInput | CampanhaUpdateManyWithWhereWithoutInstituicaoInput[]
    deleteMany?: CampanhaScalarWhereInput | CampanhaScalarWhereInput[]
  }

  export type DoacaoUncheckedUpdateManyWithoutDoadorNestedInput = {
    create?: XOR<DoacaoCreateWithoutDoadorInput, DoacaoUncheckedCreateWithoutDoadorInput> | DoacaoCreateWithoutDoadorInput[] | DoacaoUncheckedCreateWithoutDoadorInput[]
    connectOrCreate?: DoacaoCreateOrConnectWithoutDoadorInput | DoacaoCreateOrConnectWithoutDoadorInput[]
    upsert?: DoacaoUpsertWithWhereUniqueWithoutDoadorInput | DoacaoUpsertWithWhereUniqueWithoutDoadorInput[]
    createMany?: DoacaoCreateManyDoadorInputEnvelope
    set?: DoacaoWhereUniqueInput | DoacaoWhereUniqueInput[]
    disconnect?: DoacaoWhereUniqueInput | DoacaoWhereUniqueInput[]
    delete?: DoacaoWhereUniqueInput | DoacaoWhereUniqueInput[]
    connect?: DoacaoWhereUniqueInput | DoacaoWhereUniqueInput[]
    update?: DoacaoUpdateWithWhereUniqueWithoutDoadorInput | DoacaoUpdateWithWhereUniqueWithoutDoadorInput[]
    updateMany?: DoacaoUpdateManyWithWhereWithoutDoadorInput | DoacaoUpdateManyWithWhereWithoutDoadorInput[]
    deleteMany?: DoacaoScalarWhereInput | DoacaoScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutCampanhasInput = {
    create?: XOR<UserCreateWithoutCampanhasInput, UserUncheckedCreateWithoutCampanhasInput>
    connectOrCreate?: UserCreateOrConnectWithoutCampanhasInput
    connect?: UserWhereUniqueInput
  }

  export type DoacaoCreateNestedManyWithoutCampanhaInput = {
    create?: XOR<DoacaoCreateWithoutCampanhaInput, DoacaoUncheckedCreateWithoutCampanhaInput> | DoacaoCreateWithoutCampanhaInput[] | DoacaoUncheckedCreateWithoutCampanhaInput[]
    connectOrCreate?: DoacaoCreateOrConnectWithoutCampanhaInput | DoacaoCreateOrConnectWithoutCampanhaInput[]
    createMany?: DoacaoCreateManyCampanhaInputEnvelope
    connect?: DoacaoWhereUniqueInput | DoacaoWhereUniqueInput[]
  }

  export type DoacaoUncheckedCreateNestedManyWithoutCampanhaInput = {
    create?: XOR<DoacaoCreateWithoutCampanhaInput, DoacaoUncheckedCreateWithoutCampanhaInput> | DoacaoCreateWithoutCampanhaInput[] | DoacaoUncheckedCreateWithoutCampanhaInput[]
    connectOrCreate?: DoacaoCreateOrConnectWithoutCampanhaInput | DoacaoCreateOrConnectWithoutCampanhaInput[]
    createMany?: DoacaoCreateManyCampanhaInputEnvelope
    connect?: DoacaoWhereUniqueInput | DoacaoWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutCampanhasNestedInput = {
    create?: XOR<UserCreateWithoutCampanhasInput, UserUncheckedCreateWithoutCampanhasInput>
    connectOrCreate?: UserCreateOrConnectWithoutCampanhasInput
    upsert?: UserUpsertWithoutCampanhasInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCampanhasInput, UserUpdateWithoutCampanhasInput>, UserUncheckedUpdateWithoutCampanhasInput>
  }

  export type DoacaoUpdateManyWithoutCampanhaNestedInput = {
    create?: XOR<DoacaoCreateWithoutCampanhaInput, DoacaoUncheckedCreateWithoutCampanhaInput> | DoacaoCreateWithoutCampanhaInput[] | DoacaoUncheckedCreateWithoutCampanhaInput[]
    connectOrCreate?: DoacaoCreateOrConnectWithoutCampanhaInput | DoacaoCreateOrConnectWithoutCampanhaInput[]
    upsert?: DoacaoUpsertWithWhereUniqueWithoutCampanhaInput | DoacaoUpsertWithWhereUniqueWithoutCampanhaInput[]
    createMany?: DoacaoCreateManyCampanhaInputEnvelope
    set?: DoacaoWhereUniqueInput | DoacaoWhereUniqueInput[]
    disconnect?: DoacaoWhereUniqueInput | DoacaoWhereUniqueInput[]
    delete?: DoacaoWhereUniqueInput | DoacaoWhereUniqueInput[]
    connect?: DoacaoWhereUniqueInput | DoacaoWhereUniqueInput[]
    update?: DoacaoUpdateWithWhereUniqueWithoutCampanhaInput | DoacaoUpdateWithWhereUniqueWithoutCampanhaInput[]
    updateMany?: DoacaoUpdateManyWithWhereWithoutCampanhaInput | DoacaoUpdateManyWithWhereWithoutCampanhaInput[]
    deleteMany?: DoacaoScalarWhereInput | DoacaoScalarWhereInput[]
  }

  export type DoacaoUncheckedUpdateManyWithoutCampanhaNestedInput = {
    create?: XOR<DoacaoCreateWithoutCampanhaInput, DoacaoUncheckedCreateWithoutCampanhaInput> | DoacaoCreateWithoutCampanhaInput[] | DoacaoUncheckedCreateWithoutCampanhaInput[]
    connectOrCreate?: DoacaoCreateOrConnectWithoutCampanhaInput | DoacaoCreateOrConnectWithoutCampanhaInput[]
    upsert?: DoacaoUpsertWithWhereUniqueWithoutCampanhaInput | DoacaoUpsertWithWhereUniqueWithoutCampanhaInput[]
    createMany?: DoacaoCreateManyCampanhaInputEnvelope
    set?: DoacaoWhereUniqueInput | DoacaoWhereUniqueInput[]
    disconnect?: DoacaoWhereUniqueInput | DoacaoWhereUniqueInput[]
    delete?: DoacaoWhereUniqueInput | DoacaoWhereUniqueInput[]
    connect?: DoacaoWhereUniqueInput | DoacaoWhereUniqueInput[]
    update?: DoacaoUpdateWithWhereUniqueWithoutCampanhaInput | DoacaoUpdateWithWhereUniqueWithoutCampanhaInput[]
    updateMany?: DoacaoUpdateManyWithWhereWithoutCampanhaInput | DoacaoUpdateManyWithWhereWithoutCampanhaInput[]
    deleteMany?: DoacaoScalarWhereInput | DoacaoScalarWhereInput[]
  }

  export type CampanhaCreateNestedOneWithoutDoacoesInput = {
    create?: XOR<CampanhaCreateWithoutDoacoesInput, CampanhaUncheckedCreateWithoutDoacoesInput>
    connectOrCreate?: CampanhaCreateOrConnectWithoutDoacoesInput
    connect?: CampanhaWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutDoacoesInput = {
    create?: XOR<UserCreateWithoutDoacoesInput, UserUncheckedCreateWithoutDoacoesInput>
    connectOrCreate?: UserCreateOrConnectWithoutDoacoesInput
    connect?: UserWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type CampanhaUpdateOneRequiredWithoutDoacoesNestedInput = {
    create?: XOR<CampanhaCreateWithoutDoacoesInput, CampanhaUncheckedCreateWithoutDoacoesInput>
    connectOrCreate?: CampanhaCreateOrConnectWithoutDoacoesInput
    upsert?: CampanhaUpsertWithoutDoacoesInput
    connect?: CampanhaWhereUniqueInput
    update?: XOR<XOR<CampanhaUpdateToOneWithWhereWithoutDoacoesInput, CampanhaUpdateWithoutDoacoesInput>, CampanhaUncheckedUpdateWithoutDoacoesInput>
  }

  export type UserUpdateOneRequiredWithoutDoacoesNestedInput = {
    create?: XOR<UserCreateWithoutDoacoesInput, UserUncheckedCreateWithoutDoacoesInput>
    connectOrCreate?: UserCreateOrConnectWithoutDoacoesInput
    upsert?: UserUpsertWithoutDoacoesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDoacoesInput, UserUpdateWithoutDoacoesInput>, UserUncheckedUpdateWithoutDoacoesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumTipoUsuarioFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoUsuario | EnumTipoUsuarioFieldRefInput<$PrismaModel>
    in?: $Enums.TipoUsuario[] | ListEnumTipoUsuarioFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoUsuario[] | ListEnumTipoUsuarioFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoUsuarioFilter<$PrismaModel> | $Enums.TipoUsuario
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumTipoUsuarioWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoUsuario | EnumTipoUsuarioFieldRefInput<$PrismaModel>
    in?: $Enums.TipoUsuario[] | ListEnumTipoUsuarioFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoUsuario[] | ListEnumTipoUsuarioFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoUsuarioWithAggregatesFilter<$PrismaModel> | $Enums.TipoUsuario
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipoUsuarioFilter<$PrismaModel>
    _max?: NestedEnumTipoUsuarioFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type CampanhaCreateWithoutInstituicaoInput = {
    id?: string
    titulo: string
    descricao: string
    localizacao: string
    data_inicio: Date | string
    data_fim: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    doacoes?: DoacaoCreateNestedManyWithoutCampanhaInput
  }

  export type CampanhaUncheckedCreateWithoutInstituicaoInput = {
    id?: string
    titulo: string
    descricao: string
    localizacao: string
    data_inicio: Date | string
    data_fim: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    doacoes?: DoacaoUncheckedCreateNestedManyWithoutCampanhaInput
  }

  export type CampanhaCreateOrConnectWithoutInstituicaoInput = {
    where: CampanhaWhereUniqueInput
    create: XOR<CampanhaCreateWithoutInstituicaoInput, CampanhaUncheckedCreateWithoutInstituicaoInput>
  }

  export type CampanhaCreateManyInstituicaoInputEnvelope = {
    data: CampanhaCreateManyInstituicaoInput | CampanhaCreateManyInstituicaoInput[]
    skipDuplicates?: boolean
  }

  export type DoacaoCreateWithoutDoadorInput = {
    id?: string
    descricao: string
    quantidade: number
    foto_url?: string | null
    data_doacao?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    campanha: CampanhaCreateNestedOneWithoutDoacoesInput
  }

  export type DoacaoUncheckedCreateWithoutDoadorInput = {
    id?: string
    descricao: string
    quantidade: number
    foto_url?: string | null
    campanha_id: string
    data_doacao?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type DoacaoCreateOrConnectWithoutDoadorInput = {
    where: DoacaoWhereUniqueInput
    create: XOR<DoacaoCreateWithoutDoadorInput, DoacaoUncheckedCreateWithoutDoadorInput>
  }

  export type DoacaoCreateManyDoadorInputEnvelope = {
    data: DoacaoCreateManyDoadorInput | DoacaoCreateManyDoadorInput[]
    skipDuplicates?: boolean
  }

  export type CampanhaUpsertWithWhereUniqueWithoutInstituicaoInput = {
    where: CampanhaWhereUniqueInput
    update: XOR<CampanhaUpdateWithoutInstituicaoInput, CampanhaUncheckedUpdateWithoutInstituicaoInput>
    create: XOR<CampanhaCreateWithoutInstituicaoInput, CampanhaUncheckedCreateWithoutInstituicaoInput>
  }

  export type CampanhaUpdateWithWhereUniqueWithoutInstituicaoInput = {
    where: CampanhaWhereUniqueInput
    data: XOR<CampanhaUpdateWithoutInstituicaoInput, CampanhaUncheckedUpdateWithoutInstituicaoInput>
  }

  export type CampanhaUpdateManyWithWhereWithoutInstituicaoInput = {
    where: CampanhaScalarWhereInput
    data: XOR<CampanhaUpdateManyMutationInput, CampanhaUncheckedUpdateManyWithoutInstituicaoInput>
  }

  export type CampanhaScalarWhereInput = {
    AND?: CampanhaScalarWhereInput | CampanhaScalarWhereInput[]
    OR?: CampanhaScalarWhereInput[]
    NOT?: CampanhaScalarWhereInput | CampanhaScalarWhereInput[]
    id?: StringFilter<"Campanha"> | string
    titulo?: StringFilter<"Campanha"> | string
    descricao?: StringFilter<"Campanha"> | string
    localizacao?: StringFilter<"Campanha"> | string
    data_inicio?: DateTimeFilter<"Campanha"> | Date | string
    data_fim?: DateTimeFilter<"Campanha"> | Date | string
    instituicao_id?: StringFilter<"Campanha"> | string
    created_at?: DateTimeFilter<"Campanha"> | Date | string
    updated_at?: DateTimeFilter<"Campanha"> | Date | string
  }

  export type DoacaoUpsertWithWhereUniqueWithoutDoadorInput = {
    where: DoacaoWhereUniqueInput
    update: XOR<DoacaoUpdateWithoutDoadorInput, DoacaoUncheckedUpdateWithoutDoadorInput>
    create: XOR<DoacaoCreateWithoutDoadorInput, DoacaoUncheckedCreateWithoutDoadorInput>
  }

  export type DoacaoUpdateWithWhereUniqueWithoutDoadorInput = {
    where: DoacaoWhereUniqueInput
    data: XOR<DoacaoUpdateWithoutDoadorInput, DoacaoUncheckedUpdateWithoutDoadorInput>
  }

  export type DoacaoUpdateManyWithWhereWithoutDoadorInput = {
    where: DoacaoScalarWhereInput
    data: XOR<DoacaoUpdateManyMutationInput, DoacaoUncheckedUpdateManyWithoutDoadorInput>
  }

  export type DoacaoScalarWhereInput = {
    AND?: DoacaoScalarWhereInput | DoacaoScalarWhereInput[]
    OR?: DoacaoScalarWhereInput[]
    NOT?: DoacaoScalarWhereInput | DoacaoScalarWhereInput[]
    id?: StringFilter<"Doacao"> | string
    descricao?: StringFilter<"Doacao"> | string
    quantidade?: IntFilter<"Doacao"> | number
    foto_url?: StringNullableFilter<"Doacao"> | string | null
    campanha_id?: StringFilter<"Doacao"> | string
    doador_id?: StringFilter<"Doacao"> | string
    data_doacao?: DateTimeFilter<"Doacao"> | Date | string
    created_at?: DateTimeFilter<"Doacao"> | Date | string
    updated_at?: DateTimeFilter<"Doacao"> | Date | string
  }

  export type UserCreateWithoutCampanhasInput = {
    id?: string
    nome: string
    email: string
    senha: string
    tipo: $Enums.TipoUsuario
    created_at?: Date | string
    updated_at?: Date | string
    doacoes?: DoacaoCreateNestedManyWithoutDoadorInput
  }

  export type UserUncheckedCreateWithoutCampanhasInput = {
    id?: string
    nome: string
    email: string
    senha: string
    tipo: $Enums.TipoUsuario
    created_at?: Date | string
    updated_at?: Date | string
    doacoes?: DoacaoUncheckedCreateNestedManyWithoutDoadorInput
  }

  export type UserCreateOrConnectWithoutCampanhasInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCampanhasInput, UserUncheckedCreateWithoutCampanhasInput>
  }

  export type DoacaoCreateWithoutCampanhaInput = {
    id?: string
    descricao: string
    quantidade: number
    foto_url?: string | null
    data_doacao?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    doador: UserCreateNestedOneWithoutDoacoesInput
  }

  export type DoacaoUncheckedCreateWithoutCampanhaInput = {
    id?: string
    descricao: string
    quantidade: number
    foto_url?: string | null
    doador_id: string
    data_doacao?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type DoacaoCreateOrConnectWithoutCampanhaInput = {
    where: DoacaoWhereUniqueInput
    create: XOR<DoacaoCreateWithoutCampanhaInput, DoacaoUncheckedCreateWithoutCampanhaInput>
  }

  export type DoacaoCreateManyCampanhaInputEnvelope = {
    data: DoacaoCreateManyCampanhaInput | DoacaoCreateManyCampanhaInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCampanhasInput = {
    update: XOR<UserUpdateWithoutCampanhasInput, UserUncheckedUpdateWithoutCampanhasInput>
    create: XOR<UserCreateWithoutCampanhasInput, UserUncheckedCreateWithoutCampanhasInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCampanhasInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCampanhasInput, UserUncheckedUpdateWithoutCampanhasInput>
  }

  export type UserUpdateWithoutCampanhasInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    doacoes?: DoacaoUpdateManyWithoutDoadorNestedInput
  }

  export type UserUncheckedUpdateWithoutCampanhasInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    doacoes?: DoacaoUncheckedUpdateManyWithoutDoadorNestedInput
  }

  export type DoacaoUpsertWithWhereUniqueWithoutCampanhaInput = {
    where: DoacaoWhereUniqueInput
    update: XOR<DoacaoUpdateWithoutCampanhaInput, DoacaoUncheckedUpdateWithoutCampanhaInput>
    create: XOR<DoacaoCreateWithoutCampanhaInput, DoacaoUncheckedCreateWithoutCampanhaInput>
  }

  export type DoacaoUpdateWithWhereUniqueWithoutCampanhaInput = {
    where: DoacaoWhereUniqueInput
    data: XOR<DoacaoUpdateWithoutCampanhaInput, DoacaoUncheckedUpdateWithoutCampanhaInput>
  }

  export type DoacaoUpdateManyWithWhereWithoutCampanhaInput = {
    where: DoacaoScalarWhereInput
    data: XOR<DoacaoUpdateManyMutationInput, DoacaoUncheckedUpdateManyWithoutCampanhaInput>
  }

  export type CampanhaCreateWithoutDoacoesInput = {
    id?: string
    titulo: string
    descricao: string
    localizacao: string
    data_inicio: Date | string
    data_fim: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    instituicao: UserCreateNestedOneWithoutCampanhasInput
  }

  export type CampanhaUncheckedCreateWithoutDoacoesInput = {
    id?: string
    titulo: string
    descricao: string
    localizacao: string
    data_inicio: Date | string
    data_fim: Date | string
    instituicao_id: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type CampanhaCreateOrConnectWithoutDoacoesInput = {
    where: CampanhaWhereUniqueInput
    create: XOR<CampanhaCreateWithoutDoacoesInput, CampanhaUncheckedCreateWithoutDoacoesInput>
  }

  export type UserCreateWithoutDoacoesInput = {
    id?: string
    nome: string
    email: string
    senha: string
    tipo: $Enums.TipoUsuario
    created_at?: Date | string
    updated_at?: Date | string
    campanhas?: CampanhaCreateNestedManyWithoutInstituicaoInput
  }

  export type UserUncheckedCreateWithoutDoacoesInput = {
    id?: string
    nome: string
    email: string
    senha: string
    tipo: $Enums.TipoUsuario
    created_at?: Date | string
    updated_at?: Date | string
    campanhas?: CampanhaUncheckedCreateNestedManyWithoutInstituicaoInput
  }

  export type UserCreateOrConnectWithoutDoacoesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDoacoesInput, UserUncheckedCreateWithoutDoacoesInput>
  }

  export type CampanhaUpsertWithoutDoacoesInput = {
    update: XOR<CampanhaUpdateWithoutDoacoesInput, CampanhaUncheckedUpdateWithoutDoacoesInput>
    create: XOR<CampanhaCreateWithoutDoacoesInput, CampanhaUncheckedCreateWithoutDoacoesInput>
    where?: CampanhaWhereInput
  }

  export type CampanhaUpdateToOneWithWhereWithoutDoacoesInput = {
    where?: CampanhaWhereInput
    data: XOR<CampanhaUpdateWithoutDoacoesInput, CampanhaUncheckedUpdateWithoutDoacoesInput>
  }

  export type CampanhaUpdateWithoutDoacoesInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    localizacao?: StringFieldUpdateOperationsInput | string
    data_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    data_fim?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    instituicao?: UserUpdateOneRequiredWithoutCampanhasNestedInput
  }

  export type CampanhaUncheckedUpdateWithoutDoacoesInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    localizacao?: StringFieldUpdateOperationsInput | string
    data_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    data_fim?: DateTimeFieldUpdateOperationsInput | Date | string
    instituicao_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutDoacoesInput = {
    update: XOR<UserUpdateWithoutDoacoesInput, UserUncheckedUpdateWithoutDoacoesInput>
    create: XOR<UserCreateWithoutDoacoesInput, UserUncheckedCreateWithoutDoacoesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDoacoesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDoacoesInput, UserUncheckedUpdateWithoutDoacoesInput>
  }

  export type UserUpdateWithoutDoacoesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    campanhas?: CampanhaUpdateManyWithoutInstituicaoNestedInput
  }

  export type UserUncheckedUpdateWithoutDoacoesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    campanhas?: CampanhaUncheckedUpdateManyWithoutInstituicaoNestedInput
  }

  export type CampanhaCreateManyInstituicaoInput = {
    id?: string
    titulo: string
    descricao: string
    localizacao: string
    data_inicio: Date | string
    data_fim: Date | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type DoacaoCreateManyDoadorInput = {
    id?: string
    descricao: string
    quantidade: number
    foto_url?: string | null
    campanha_id: string
    data_doacao?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type CampanhaUpdateWithoutInstituicaoInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    localizacao?: StringFieldUpdateOperationsInput | string
    data_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    data_fim?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    doacoes?: DoacaoUpdateManyWithoutCampanhaNestedInput
  }

  export type CampanhaUncheckedUpdateWithoutInstituicaoInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    localizacao?: StringFieldUpdateOperationsInput | string
    data_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    data_fim?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    doacoes?: DoacaoUncheckedUpdateManyWithoutCampanhaNestedInput
  }

  export type CampanhaUncheckedUpdateManyWithoutInstituicaoInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    localizacao?: StringFieldUpdateOperationsInput | string
    data_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    data_fim?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoacaoUpdateWithoutDoadorInput = {
    id?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    foto_url?: NullableStringFieldUpdateOperationsInput | string | null
    data_doacao?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    campanha?: CampanhaUpdateOneRequiredWithoutDoacoesNestedInput
  }

  export type DoacaoUncheckedUpdateWithoutDoadorInput = {
    id?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    foto_url?: NullableStringFieldUpdateOperationsInput | string | null
    campanha_id?: StringFieldUpdateOperationsInput | string
    data_doacao?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoacaoUncheckedUpdateManyWithoutDoadorInput = {
    id?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    foto_url?: NullableStringFieldUpdateOperationsInput | string | null
    campanha_id?: StringFieldUpdateOperationsInput | string
    data_doacao?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoacaoCreateManyCampanhaInput = {
    id?: string
    descricao: string
    quantidade: number
    foto_url?: string | null
    doador_id: string
    data_doacao?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type DoacaoUpdateWithoutCampanhaInput = {
    id?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    foto_url?: NullableStringFieldUpdateOperationsInput | string | null
    data_doacao?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    doador?: UserUpdateOneRequiredWithoutDoacoesNestedInput
  }

  export type DoacaoUncheckedUpdateWithoutCampanhaInput = {
    id?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    foto_url?: NullableStringFieldUpdateOperationsInput | string | null
    doador_id?: StringFieldUpdateOperationsInput | string
    data_doacao?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoacaoUncheckedUpdateManyWithoutCampanhaInput = {
    id?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    foto_url?: NullableStringFieldUpdateOperationsInput | string | null
    doador_id?: StringFieldUpdateOperationsInput | string
    data_doacao?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}