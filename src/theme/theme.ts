
  interface Color {
    orange: string;
    orangeclaro: string;
    gray: string;
    grayescuro: string;
  }
  
  export const COLORS: Color = {
    orange: '#FF6B00',
    orangeclaro: '#D17842',
    gray: '#BCBCBC',
    grayescuro: '#717171',
  };

  interface Icon {
    avatarsavio: any;
    acquisition: any;
    cart: any;
    report: any;
    skewer_simple: any;
    skewer: any;
    hamburguer: any;
    food: any;
    drink: any;
    bag: any;
  }

  export const ICONS: Icon = {
    avatarsavio: require('../../img/avatarsavio.jpg'),
    acquisition: require('../../img/acquisition.png'),
    cart: require('../../img/cart.png'),
    report: require('../../img/report.png'),
    skewer_simple: require('../../img/skewer-simple.png'),
    skewer: require('../../img/skewer.png'),
    hamburguer: require('../../img/hamburguer.png'),
    food: require('../../img/food.png'),
    drink: require('../../img/drink.png'),
    bag: require('../../img/bag.png'),
  };
  