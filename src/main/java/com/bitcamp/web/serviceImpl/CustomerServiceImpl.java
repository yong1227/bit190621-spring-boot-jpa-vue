package com.bitcamp.web.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.bitcamp.web.common.util.PageProxy;
import com.bitcamp.web.domain.CustomerDTO;
import com.bitcamp.web.service.CustomerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * CustomerServlceImpl
 */
@Service
public class CustomerServiceImpl implements CustomerService {


    @Override
    public void addCustomer(CustomerDTO customer) {
        System.out.println("====serviceimp============");
    }

    @Override
    public List<CustomerDTO> findCustomers() {
        return null;
    }

    @Override
    public List<CustomerDTO> findCustomersByOption(CustomerDTO customer) {
        return null;
    }

    @Override
    public CustomerDTO findCustomerByCustomerId(String customer) {
        return null;
    }

    @Override
    public int updateCustomer(CustomerDTO customer) {
        return 0;
    }

    @Override
    public void deleteCustomer(CustomerDTO customer) {
    }

    @Override
    public int countAll() {
        return 0;
    }

    @Override
    public CustomerDTO login(CustomerDTO customer) {
        System.out.println("컨트롤러에서 넘어온 ID: " + customer.getCustomerId());
        System.out.println("컨트롤러에서 넘어온 PASSWORD: " + customer.getPassword());

        // mapper에 값을 전달해줘야한다.
        return null;
    }

    @Override
    public List<CustomerDTO> findCustomers(PageProxy pxy) {
        return null;
    }
}