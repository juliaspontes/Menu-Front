function FormatMoney(valor: number | undefined, withAcronym: boolean = true): string {
    const value = Number(valor || '')?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) || '';
    if (withAcronym) {
        return value;
    } else {
        return value?.replace('R$', '');
    }
}

export default FormatMoney;