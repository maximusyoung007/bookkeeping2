package com.maximus.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.maximus.SystemEnvironment;
import com.maximus.VO.TxTypeVO;
import com.maximus.dao.TxTypeDAO;
import com.maximus.entity.Result;
import com.maximus.entity.TxType;
import com.maximus.mapper.TxTypeMapper;
import com.maximus.service.TxTypeService;
import org.apache.dubbo.common.utils.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * @author maximusyoung
 */
@RestController
@RequestMapping("/txType")
public class TxTypeController {
    protected static Logger logger = LoggerFactory.getLogger(TxTypeController.class);

    @Resource
    private TxTypeService txTypeService;

    @Resource
    private TxTypeDAO txTypeDAO;

    @Resource
    private TxTypeMapper txTypeMapper;

    /**
     * 1,只有type, type存在，donothing；type不存在，insert type
     * 2,有type和subType，
     * type存在，subType不存在；存subType
     * type存在，subType存在；donothing
     * type不存在，subType不存在；insert type, subType
     * type不存在，subType存在  ,这种情况一定是新增的type不等于subType已有的父type，抛异常
     * @param txTypeVO
     * @return
     */
    @PostMapping("addTxType")
    public Result addTxType(@RequestBody TxTypeVO txTypeVO) {
        try {
            //叶子节点直接保存
            QueryWrapper<TxType> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("name", txTypeVO.getName());
            boolean isTxTypeExist = txTypeMapper.exists(queryWrapper);
            if (StringUtils.isEmpty(txTypeVO.getSubName())) {
                if (isTxTypeExist) {
                    return Result.fail(2001, "分类已存在");
                }
                TxType txType = new TxType();
                txType.setId(UUID.randomUUID().toString());
                txType.setFatherId(txType.getId());
                txType.setIsLeaf(0);
                txType.setName(txTypeVO.getName());
                txType.setKind(txTypeVO.getKind());
                int count = txTypeService.addType(txType);
                if (count == 1) {
                    if (!SystemEnvironment.TX_TYPE_MAP.containsKey(txType.getId())) {
                        SystemEnvironment.TX_TYPE_MAP.put(txType.getId(), txType.getName());
                    }
                    return Result.success("插入成功");
                }
            } else {
                QueryWrapper<TxType> queryWrapper1 = new QueryWrapper<>();
                queryWrapper1.eq("name", txTypeVO.getSubName());
                boolean isSubTypeExist = txTypeMapper.exists(queryWrapper1);

                TxType txType = new TxType();
                TxType subTxType = new TxType();
                if (isTxTypeExist) {
                    txType = txTypeMapper.selectOne(queryWrapper);
                    if (!isSubTypeExist) {
                        subTxType.setId(UUID.randomUUID().toString());
                        subTxType.setFatherId(txType.getFatherId());
                        subTxType.setIsLeaf(1);
                        subTxType.setName(txTypeVO.getSubName());
                        subTxType.setKind(txTypeVO.getKind());
                        int count = txTypeService.addType(subTxType);
                        if (count == 1) {
                            if (!SystemEnvironment.TX_TYPE_MAP.containsKey(subTxType.getId())) {
                                SystemEnvironment.TX_TYPE_MAP.put(subTxType.getId(), subTxType.getName());
                            }
                            return Result.success("插入成功");
                        }
                    } else {
                        return Result.fail(2001, "分类已存在");
                    }
                } else {
                    if (!isSubTypeExist) {
                        txType.setId(UUID.randomUUID().toString());
                        txType.setFatherId(txType.getId());
                        txType.setName(txTypeVO.getName());
                        txType.setIsLeaf(0);
                        txType.setKind(txTypeVO.getKind());
                        subTxType.setId(UUID.randomUUID().toString());
                        subTxType.setFatherId(txType.getId());
                        subTxType.setName(txTypeVO.getSubName());
                        subTxType.setIsLeaf(1);
                        subTxType.setKind(txTypeVO.getKind());

                        try {
                            int count = txTypeDAO.addTxType(txType, subTxType);

                            if (count == 2) {
                                if (!SystemEnvironment.TX_TYPE_MAP.containsKey(txType.getId())) {
                                    SystemEnvironment.TX_TYPE_MAP.put(txType.getId(), txType.getName());
                                }
                                if (!SystemEnvironment.TX_TYPE_MAP.containsKey(subTxType.getId())) {
                                    SystemEnvironment.TX_TYPE_MAP.put(subTxType.getId(), subTxType.getName());
                                }
                                return Result.success("插入成功");
                            }
                        } catch (Exception e) {
                            logger.error("数据库异常", e);
                        }
                    } else {
                        return Result.fail(2001, "新增分类与二级分类已有父分类冲突");
                    }
                }
            }
        } catch (DuplicateKeyException dke) {
            logger.info("分类名称重复", dke);
            return Result.fail(2001, "分类名称重复");
        } catch (Exception e) {
            logger.info("系统异常", e);
            return Result.fail(2001, e.toString());
        }

        return null;
    }

    @PostMapping("getTxType")
    public Result getTxType(@RequestBody TxTypeVO txTypeVO) {
        Map<String, Object> map = new HashMap<>();
        if (txTypeVO.getIsLeaf() != null) {
            map.put("is_leaf", txTypeVO.getIsLeaf());
        }
        map.put("kind", txTypeVO.getKind());
        List<TxType> typeList = txTypeMapper.selectByMap(map);

        return Result.success(typeList);
    }
}
