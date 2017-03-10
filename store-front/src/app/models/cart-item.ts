import { Book } from './book';
import { ShoppingCart } from './shopping-cart';
import { Order } from './order';

export class CartItem {

	public id: number;
    public qty: number;
    public subtotal: number;
    public book: Book;
    public shoppingCart: ShoppingCart;
    public order: Order;

}
