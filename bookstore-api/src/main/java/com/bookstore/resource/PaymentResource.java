package com.bookstore.resource;

import com.bookstore.domain.User;
import com.bookstore.domain.UserBilling;
import com.bookstore.domain.UserPayment;
import com.bookstore.domain.UserShipping;
import com.bookstore.service.UserPaymentService;
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

    @Autowired
    private UserPaymentService userPaymentService;

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public ResponseEntity addNewCreditCardPost(
            @RequestBody UserPayment userPayment,
            Principal principal, Model model) {
        User user = userService.findByUsername(principal.getName());

        UserBilling userBilling = userPayment.getUserBilling();

        userService.updateUserBilling(userBilling, userPayment, user);

        return new ResponseEntity("Payment Added(Updated) Successfully!", HttpStatus.OK);
    }

//    @RequestMapping("/update")
//    public ResponseEntity updateCreditCard(
//            @RequestBody String id, Principal principal,
//            Model model
//    ) {
//
//        User user = userService.findByUsername(principal.getName());
//        UserPayment userPayment = userPaymentService.findById(Long.parseLong(id));
//
//        if (user.getId()!=userPayment.getUser().getId()) {
//            return new ResponseEntity("Invalid Request", HttpStatus.BAD_REQUEST);
//        } else {
//
//            model.addAttribute("user", user);
//            UserBilling userBilling = userPayment.getUserBilling();
//            model.addAttribute("userPayment", userPayment);
//            model.addAttribute("userBilling", userBilling);
//
//            List<String> stateList = USConstants.listOfUSStatesCode;
//            Collections.sort(stateList);
//            model.addAttribute("stateList", stateList);
//
//            model.addAttribute("addNewCreditCard", true);
//            model.addAttribute("classActiveBilling", true);
//            model.addAttribute("listOfShippingAddresses", true);
//            model.addAttribute("userPaymentList", user.getUserPaymentList());
//            model.addAttribute("userShippingList", user.getUserShippingList());
//            model.addAttribute("orderList", user.getOrderList());
//
//
//            return new ResponseEntity("Payment Added(Updated) Successfully!", HttpStatus.OK);
//        }
//    }

    @RequestMapping(value = "/remove", method = RequestMethod.POST)
    public ResponseEntity removePaymentPost(
            @RequestBody String id,
            Principal principal, Model model) {
        User user = userService.findByUsername(principal.getName());
        model.addAttribute("user", user);

        userPaymentService.removeById(Long.parseLong(id));

        return new ResponseEntity("Payment Removed Successfully!", HttpStatus.OK);


    }

    @RequestMapping(value = "/setDefault", method = RequestMethod.POST)
    public ResponseEntity setDefaultPaymentPost(
            @RequestBody String id,
            Principal principal, Model model) {
        User user = userService.findByUsername(principal.getName());
        userService.setUserDefaultPayment(Long.parseLong(id), user);

        return new ResponseEntity("Set Default Payment Successfully!", HttpStatus.OK);
    }

    @RequestMapping(value = "/getUserPaymentList")
    public List<UserPayment> getUserPaymentList(
            Principal principal) {
        User user = userService.findByUsername(principal.getName());

        List<UserPayment> userPaymentList = user.getUserPaymentList();

        return userPaymentList;
    }
}
