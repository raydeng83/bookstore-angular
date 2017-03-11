package com.bookstore.resource;

import com.bookstore.domain.*;
import com.bookstore.service.*;
import com.bookstore.utility.MailConstructor;
import com.bookstore.utility.USConstants;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.util.*;
import java.util.concurrent.TimeUnit;

/**
 * Created by z00382545 on 3/10/17.
 */

@RestController
@RequestMapping("/checkout")
public class CheckoutResource {

    private Order order = new Order();

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private UserService userService;

    @Autowired
    private CartItemService cartItemService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private ShoppingCartService shoppingCartService;

    @Autowired
    private MailConstructor mailConstructor;

    @RequestMapping(value = "/checkout", method = RequestMethod.POST)
    public Order checkoutPost(
            @RequestBody HashMap<String, Object> mapper,
            Principal principal
    ) {
        ObjectMapper om = new ObjectMapper();

        ShippingAddress shippingAddress = om.convertValue(mapper.get("shippingAddress"), ShippingAddress.class);

        BillingAddress billingAddress = om.convertValue(mapper.get("billingAddress"), BillingAddress.class);

        Payment payment = om.convertValue(mapper.get("payment"), Payment.class);
        String shippingMethod = (String) mapper.get("shippingMethod");


        ShoppingCart shoppingCart = userService.findByUsername(principal.getName()).getShoppingCart();

        List<CartItem> cartItemList = cartItemService.findByShoppingCart(shoppingCart);

        User user = userService.findByUsername(principal.getName());

        Order order = orderService.createOrder(shoppingCart, shippingAddress, billingAddress, payment, shippingMethod, user);

        mailSender.send(mailConstructor.constructOrderConfirmationEmail(user, order, Locale.ENGLISH));

        shoppingCartService.clearShoppingCart(shoppingCart);

        LocalDate today = LocalDate.now();
        LocalDate estimatedDeliveryDate;

        if (shippingMethod.equals("groundShipping")) {
            estimatedDeliveryDate = today.plusDays(5);
        } else {
            estimatedDeliveryDate = today.plusDays(3);
        }

        this.order = order;

        return order;

    }


}
