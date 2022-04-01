package paymentdemo.service.impl;

import paymentdemo.entity.Product;
import paymentdemo.mapper.ProductMapper;
import paymentdemo.service.ProductService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl extends ServiceImpl<ProductMapper, Product> implements ProductService {

}
