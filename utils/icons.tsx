import {
  BanknoteIcon,
  BookAIcon,
  BrushCleaningIcon,
  CalculatorIcon,
  CircleQuestionMarkIcon,
  ClipboardListIcon,
  NotebookTextIcon,
  PackageIcon,
  PencilIcon,
  SendIcon,
  ShoppingCartIcon,
  ShowerHeadIcon,
  SquarePenIcon,
  UserIcon,
  WalletIcon,
} from "lucide-react";

const iconsMap = {
  calculadora: CalculatorIcon,
  livro: BookAIcon,
  chuveiro: ShowerHeadIcon,
  carteira: WalletIcon,
  dinheiro: BanknoteIcon,
  enviar: SendIcon,
  pacote: PackageIcon,
  caderno: NotebookTextIcon,
  lapis: PencilIcon,
  limpar: BrushCleaningIcon,
  editar: SquarePenIcon,
  carrinho: ShoppingCartIcon,
  prancheta: ClipboardListIcon,
  usuario: UserIcon,
} as const;

type IconsType = keyof typeof iconsMap;
export const iconsName = Object.keys(iconsMap) as IconsType[];

export const iconsList = (Object.keys(iconsMap) as IconsType[]).map((key) => ({
  name: key,
  component: iconsMap[key],
}));

export const findIcon = (name: string) => {
  const icon = iconsList.find((item) => item.name === name);

  if (icon) {
    return icon.component;
  }
};
