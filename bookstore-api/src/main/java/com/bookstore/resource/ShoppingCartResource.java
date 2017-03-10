package com.bookstore.resource;

import com.bookstore.domain.Book;
import com.bookstore.domain.CartItem;
import com.bookstore.domain.ShoppingCart;
import com.bookstore.domain.User;
import com.bookstore.service.BookService;
import com.bookstore.service.CartItemService;
import com.bookstore.service.ShoppingCartService;
import com.bookstore.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;

/**
 * Created by z00382545 on 3/10/17.
 */

@RestController
@RequestMapping("/cart")
public class ShoppingCartResource {

    @Autowired
    private UserService userService;

    @Autowired
    private BookService bookService;

    @Autowired
    private CartItemService cartItemService;

    @Autowired
    private ShoppingCartService shoppingCartService;

    @RequestMapping("/add")
    public ResponseEntity addItem(
            @RequestBody HashMap<String, String> mapper,
            Principal principal) {
        String bookId = (String) mapper.get("bookId");
        String qty = (String) mapper.get("qty");

        User user = userService.findByUsername(principal.getName());
        Book book = bookService.findOne(Long.parseLong(bookId));

        if(Integer.parseInt(qty)>book.getInStockNumber()) {
            return new ResponseEntity("Not Enough Stock!", HttpStatus.BAD_REQUEST);

        }

        CartItem cartItem = cartItemService.addBookToCartItem(book, user, Integer.parseInt(qty));

        return new ResponseEntity("Book Added Successfully!", HttpStatus.OK);

    }

    @RequestMapping("/getCart")
    public List<CartItem> shoppingCart(Principal principal) {
        User user = userService.findByUsername(principal.getName());
        ShoppingCart shoppingCart = user.getShoppingCart();

        List<CartItem> cartItemList = cartItemService.findByShoppingCart(shoppingCart);

        shoppingCartService.updateShoppingCart(shoppingCart);


        return cartItemList;
    }
}
