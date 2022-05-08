// small: 9, // 12
// normal: 13, // 16
// medium: 17, // 20
// title: 21, // 24

export type IVariant =
  | 'smallPrimaryPoppinsRegular'
  | 'smallTextPoppinsRegular'
  | 'titlePrimaryMontserratBold'
  | 'smallPrimaryPoppinsBold'
  | 'mediumPrimaryPoppinsMedium'
  | 'mediumTitlePoppinsMedium';

export const variant = {
  smallTextPoppinsRegular: {
    fontSize: 14,
    color: 'text',
    fontFamily: 'poppins_regular',
  },
  smallPrimaryPoppinsRegular: {
    fontSize: 14,
    color: 'primary',
    fontFamily: 'poppins_regular',
  },
  titlePrimaryMontserratBold: {
    fontSize: 24,
    color: 'primary',
    fontFamily: 'montserrat_bold',
  },
  smallPrimaryPoppinsBold: {
    fontFamily: 'poppins_bold',
    fontSize: 14,
    color: 'primary',
  },
  mediumTitlePoppinsMedium: {
    fontFamily: 'poppins_medium',
    fontSize: 20,
    color: 'title',
  },
  mediumPrimaryPoppinsMedium: {
    fontFamily: 'poppins_medium',
    fontSize: 20,
    color: 'primary',
  },
};
