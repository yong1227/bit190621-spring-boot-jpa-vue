package com.bitcamp.web.common.util;

import java.util.Map;

import com.bitcamp.web.service.CustomerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import lombok.Data;

 @Component
 @Data
 @Lazy
public class PageProxy {
    
    private int pageNum, pageSize, blockSize, startRow, endRow, startPage, endPage, prevBlock, nextBlock, totalCount;

    //검색어
    private String search;

    // 페이지 화살표 보이게 하는 거
    private boolean existPrev, existNext;

    public void execute(Map<?,?> paramMap){

        // Dim-1 Row scalar count
        int totalCount = Integer.parseInt(String.valueOf(paramMap.get("totalCount")));
        // Dim-2 Page scalar info
        String _pageNum = (String)paramMap.get("page_num");
        //다른 페이지일 때 무조건 1페이지를 보여주세요
        pageNum = (_pageNum == null) ? 1 : Integer.parseInt(_pageNum);
        // 페이지 개수 몇 개씩 볼거냐
        String _pageSize = (String)paramMap.get("page_size");
        pageSize = (_pageSize == null) ? 5 : Integer.parseInt(_pageSize);

        // totalCount = DB에 있는 테이블에서 갯수 가져온다.
        // 나머지는 
        int nmg = totalCount % pageSize;
        int pageCount = (nmg ==0) ? totalCount / pageSize : totalCount / pageSize + 1; // 마지막에 2개 남아도 1페이지는 보여야하니까
        
        //startRow - start개념은 2차원에서 다룬다.
        startRow = (pageNum -1) * pageSize;
        //endRow
        endRow = (totalCount > pageNum * pageSize) ? pageNum * pageSize : totalCount;

        // Dim-3 Block scalar info
        //blockSize 기본값 5 , 한 페이지 묶음
        String _blckSize = (String)paramMap.get("block_size");
        blockSize = (_blckSize == null) ? 5 : Integer.parseInt(_blckSize);

        int blockNum = (pageNum -1) / blockSize;
        
        existPrev = (startPage - pageSize) >0;
        existNext = (startPage + pageSize) <= pageCount;

        startPage = (existPrev) ? blockNum * blockSize +1 : 1;
        endPage =(endPage > pageCount) ? pageCount : startPage + (blockSize -1);
        
        prevBlock = startPage - pageSize;
        nextBlock = startPage + pageSize;

        search = (String)paramMap.get("search");
    
    }
}