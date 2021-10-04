type Whitespace = " " | "\n" | "\t" | "\r" | "\f" | "\v";

type TrimEnd<S extends string> = S extends `${infer Rest}${Whitespace}` ? TrimEnd<Rest> : S;
type TrimStart<S extends string> = S extends `${Whitespace}${infer Rest}` ? TrimStart<Rest> : S;
type Trim<S extends string> = TrimStart<TrimEnd<S>>;

type ParseRules<
    S extends string,
    Rules extends unknown[] = [],
> = S extends `${infer Rule}:${infer Value};${infer Rest}`
    ? ParseRules<Rest, [...Rules, {
        rule: Trim<Rule>;
        value: Trim<Value>;
    }]>
    : Rules;

type ActualParseCSS<
    S extends string,
    Parsed extends unknown[] = [],
> = S extends `${infer Selector}{${infer Rules}}${infer Rest}`
    ? ActualParseCSS<Rest, [...Parsed, [Trim<Selector>, ParseRules<Trim<Rules>>]]>
    : Parsed;

type ParseCSS<S extends string> = ActualParseCSS<S>;
