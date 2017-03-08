package com.bookstore.resource;

import com.bookstore.domain.User;
import com.bookstore.domain.UserBilling;
import com.bookstore.domain.UserPayment;
import com.bookstore.service.UserService;
import com.bookstore.utility.USConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;

/**
 * Created by z00382545 on 3/8/17.
 */

@RestController
@RequestMapping("/payment")
public class PaymentResource {

    @Autowired
    private UserService userService;

    @RequestMapping("/listOfCreditCards")
    public String listOfCreditCards(
            Model model, Principal principal, HttpServletRequest request
    ) {
        User user = userService.findByUsername(principal.getName());
        model.addAttribute("user", user);
        model.addAttribute("userPaymentList", user.getUserPaymentList());
        model.addAttribute("userShippingList", user.getUserShippingList());
        model.addAttribute("orderList", user.getOrderList());


        model.addAttribute("listOfCreditCards", true);
        model.addAttribute("classActiveBilling", true);
        model.addAttribute("listOfShippingAddresses", true);

        return "myProfile";
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public ResponseEntity addNewCreditCardPost(
            @RequestBody HashMap<String, Object> mapper,
            Principal principal, Model model) {
        User user = userService.findByUsername(principal.getName());
        UserPayment userPayment = (UserPayment) mapper.get("userPayment");
        UserBilling userBilling = (UserBilling) mapper.get("userBilling");

        userService.updateUserBilling(userBilling, userPayment, user);

        return new ResponseEntity("Payment Added(Updated) Successfully!", HttpStatus.OK);


    }
}
