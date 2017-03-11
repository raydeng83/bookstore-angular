package com.bookstore.resource;

import com.bookstore.domain.Book;
import com.bookstore.domain.User;
import com.bookstore.service.BookService;
import com.bookstore.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.websocket.server.PathParam;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.Principal;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

/**
 * Created by z00382545 on 1/16/17.
 */

@RestController
@RequestMapping("/book")
public class BookResource {
    private String imageName;

    @Autowired
    private BookService bookService;

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/add/image", method = RequestMethod.POST)
    public ResponseEntity upload(
            @RequestParam("id") Long id,
            HttpServletResponse response, HttpServletRequest request
    ) {
        try {
            Book book = bookService.findOne(id);
            MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
            Iterator<String> it = multipartRequest.getFileNames();
            MultipartFile multipartFile = multipartRequest.getFile(it.next());
            String fileName = id+".png";
            imageName = fileName;

            byte[] bytes = multipartFile.getBytes();
            BufferedOutputStream stream =
                    new BufferedOutputStream(new FileOutputStream(new File("src/main/resources/static/image/book/" + fileName)));
            stream.write(bytes);
            stream.close();

            return new ResponseEntity("Upload Success!", HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity("Upload Failed!", HttpStatus.BAD_REQUEST);
        }

    }

    @RequestMapping(value = "/update/image", method = RequestMethod.POST)
    public ResponseEntity updateImagePost(
            @RequestParam("id") Long id,
            HttpServletResponse response, HttpServletRequest request
    ) {
        try {
            Book book = bookService.findOne(id);
            MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
            Iterator<String> it = multipartRequest.getFileNames();
            MultipartFile multipartFile = multipartRequest.getFile(it.next());
            String fileName = id+".png";
            imageName = fileName;

            Files.delete(Paths.get("src/main/resources/static/image/book/"+fileName));

            byte[] bytes = multipartFile.getBytes();
            BufferedOutputStream stream =
                    new BufferedOutputStream(new FileOutputStream(new File("src/main/resources/static/image/book/" + fileName)));
            stream.write(bytes);
            stream.close();

            return new ResponseEntity("Upload Success!", HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity("Upload Failed!", HttpStatus.BAD_REQUEST);
        }

    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public Book addBookPost(@RequestBody Book book) {
        return bookService.save(book);
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public Book updateBookPost(@RequestBody Book book) {
        return bookService.save(book);
    }


    @RequestMapping("/bookList")
    public List<Book> getBookList(){
        return bookService.findAll();
    }

    @RequestMapping("/{id}")
    public Book getBook(
            @PathVariable("id") Long id
    ) {
        Book book = bookService.findOne(id);
        return book;
    }

    @RequestMapping(value = "/remove", method = RequestMethod.POST)
    public ResponseEntity remove(
            @RequestBody String id, Model model
    ){
        bookService.removeOne(Long.parseLong(id));

        return new ResponseEntity("Remove Success!", HttpStatus.OK);
    }

    @RequestMapping(value="/searchBook", method = RequestMethod.POST)
    public List<Book> searchBook(
            @RequestBody String keyword,
            Principal principal
    ) {
        if (principal != null) {
            String username = principal.getName();
            User user = userService.findByUsername(username);
        }

        List<Book> bookList = bookService.blurrySearch(keyword);

        return bookList;
    }
}
