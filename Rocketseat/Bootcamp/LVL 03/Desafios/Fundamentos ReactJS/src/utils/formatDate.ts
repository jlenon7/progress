const formatDate = (value: Date): string =>
  new Intl.DateTimeFormat('pt-BR').format(new Date(value));

export default formatDate;
