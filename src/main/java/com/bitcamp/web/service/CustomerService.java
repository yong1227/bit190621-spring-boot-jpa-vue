package com.bitcamp.web.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.bitcamp.web.common.util.PageProxy;
import com.bitcamp.web.domain.CustomerDTO;

import org.springframework.stereotype.Component;

/**
 * CustomerService
 */
@Component
public interface CustomerService {

    public void addCustomer(CustomerDTO customer);
    public List<CustomerDTO> findCustomers();

    public List<CustomerDTO> findCustomers(PageProxy pxy);

    public List<CustomerDTO> findCustomersByOption(CustomerDTO customer);
    public CustomerDTO findCustomerByCustomerId(String customer);

    public int updateCustomer(CustomerDTO customer);

    public void deleteCustomer(CustomerDTO customer);

	public int countAll();

    public CustomerDTO login(CustomerDTO customer);
}