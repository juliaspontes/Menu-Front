function FormatNumber(value: number | undefined, digits: number = 2, defaulValue: string = '', prefix: string = '', sufix: string = ''): string {

    const result = Number(value ?? defaulValue).toLocaleString('pt-br', { maximumFractionDigits: digits, minimumFractionDigits: digits });

    return result ? (prefix + result + sufix) : defaulValue;
}

export default FormatNumber;