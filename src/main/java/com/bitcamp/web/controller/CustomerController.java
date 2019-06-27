package com.bitcamp.web.controller;

import java.lang.ProcessBuilder.Redirect;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.bitcamp.web.common.util.PageProxy;
import com.bitcamp.web.common.util.Printer;
import com.bitcamp.web.domain.CustomerDTO;
import com.bitcamp.web.service.CustomerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * CustomerController
 */
@RestController
@RequestMapping("/customers")
public class CustomerController {
    @Autowired CustomerService customerService;
    @Autowired CustomerDTO customer;
    @Autowired Printer p;
    @Autowired PageProxy pxy;
    
    //전체목록 가져오기
    @GetMapping("/page/{pageNum}")
    public HashMap<String, Object> list(@PathVariable String pageNum) {
        //page_num, rowCount, page_size, block_size
        System.out.println("총 인원 페이징");
        HashMap<String,Object> map = new HashMap<>();
        map.put("totalCount", customerService.countAll());
        map.put("page_num", pageNum);
        map.put("page_size", "5");
        map.put("block_size", "5");
        pxy.execute(map);
        System.out.println(map.get("totalCount"));
        System.out.println(map.get("page_num"));

        map.put("list",customerService.findCustomers(pxy));
        map.put("pxy", pxy);
        return map;
    }

    @GetMapping("/count")
    public String count(){
        System.out.println("CustomerController count() 경로로 들어온다");
        int count = customerService.countAll();
        System.out.println("고객의 총인원 : " + count);
        return "100";
    }

    @GetMapping("/{customerId}/{password}")
    public CustomerDTO login(@PathVariable("customerId")String id,
                        @PathVariable("password")String pass){
        
        customer.setCustomerId(id);
        customer.setPassword(pass);
        return customerService.login(customer); 
    }

    @PostMapping("/post")
    public HashMap<String, Object> join(@RequestBody CustomerDTO param) {

        HashMap<String,Object> map = new HashMap<>();
        p.accept("Post 진입");
        map.put("result","SUCCESS");
        return map;
    }

    @GetMapping("/get/{customerId}")
    public CustomerDTO selectOne(@PathVariable String customerId) {

        HashMap<String,Object> map = new HashMap<>();
        p.accept("get 진입"+customerId);
        customer.setCustomerId("hong");
        return customer;


        // System.out.println("id 검색 진입");
        // return customerService.findCustomerByCustomerId(customerId);
    }

    @PutMapping("/put/{customerId}")
    public HashMap<String, Object> update(@PathVariable String customerId) {
        HashMap<String,Object> map = new HashMap<>();

       p.accept("put 진입 : " + customerId);
       customer.setCustomerId("kim");
       map.put("result", "성공");
        return map;
    }

    @DeleteMapping("/del/{customerId}")
    public HashMap delete(@PathVariable String customerId) {
        HashMap<String,Object> map = new HashMap<>();
        p.accept("delete 진입 : " + customerId);
        customer.setCustomerId(customerId);
        map.put("result", "탈퇴 성공");
        return map;
    }
}