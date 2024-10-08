<template>
  <div  >
    <el-scrollbar v-loading="loading" v-if="projectName == 'engineering'">
    <!-- 基础信息 -->
    <table class="mailTable" >
      <tr>
        <thead>基础信息</thead>
      </tr>
      <tr >
        <td class="column">单位工程名称：</td>
        <td colspan="3">{{projectdetails.dwgcmc}}</td>
      </tr>
      <tr >
        <td class="column">单位工程类别：</td>
        <td >{{projectdetails.dwgclxName}}</td>
        <td class="column">工程地点：</td>
        <td >{{projectdetails.gcdd}}</td>
      </tr>
      <tr >
        <td class="column">建设单位：</td>
        <td >{{projectdetails.jsdw}}</td>
        <td class="column">代建单位：</td>
        <td >{{projectdetails.djdw}}</td>
      </tr>
      <tr >
        <td class="column">施工单位：</td>
        <td >{{projectdetails.sgdw}}</td>
        <td class="column">监理单位：</td>
        <td >{{projectdetails.jldw}}</td>
      </tr>
      <tr >
        <td class="column">用地面积：</td>
        <td >{{projectdetails.ydmj}}</td>
        <td class="column">建筑面积：</td>
        <td >{{projectdetails.jzmj}}</td>
      </tr>
      <tr >
        <td class="column">结构类型：</td>
        <td >{{projectdetails.jglxName}}</td>
        <td class="column">工程造价：</td>
        <td >{{projectdetails.gczj}}</td>
      </tr>
      <tr >
        <td class="column">开工日期：</td>
        <td >{{projectdetails.kgsj | formatDate}}</td>
        <td class="column">竣工日期：</td>
        <td >{{projectdetails.jgsj | formatDate}}</td>
      </tr>
      <tr >
        <td class="column">工程结算：</td>
        <td >{{projectdetails.gcjs}}</td>
        <td class="column">附注：</td>
        <td >{{projectdetails.fz}}</td>
      </tr>
    </table>
        <!-- 单位工程专业专业信息注销 B -->
             <!-- <table class="mailTable" v-if="ProjectBridgeFlag">


                <tr >
                  <td class="column">桥梁工程类型：</td>
                  <td >{{projectdetails.qlgclx}}</td>
                  <td class="column">桥梁结构体系：</td>
                  <td >{{projectdetails.qljgtx}}</td>
                  <td class="column">桥面功能：</td>
                  <td >{{projectdetails.qmgn}}</td>
                </tr>
                <tr >
                  <td class="column">桥梁材料：</td>
                  <td >{{projectdetails.qlcl}}</td>
                  <td class="column">桥梁荷载：</td>
                  <td >{{projectdetails.qlhz}}</td>
                  <td class="column">行车道位置：</td>
                  <td >{{projectdetails.xcdwz}}</td>
                </tr>
                <tr >
                  <td class="column">跨越障碍性质：</td>
                  <td >{{projectdetails.kyzaxz}}</td>
                  <td class="column">桥梁建筑高度：</td>
                  <td >{{projectdetails.qljzgd}}</td>
                  <td class="column">桥下净空高度：</td>
                  <td >{{projectdetails.qxjkgd}}</td>
                </tr>
                <tr >
                  <td class="column">涵洞建筑材料：</td>
                  <td >{{projectdetails.hdjzcl}}</td>
                  <td class="column">涵洞构造类型：</td>
                  <td >{{projectdetails.hdgzlx}}</td>
                  <td class="column">桥梁长度：</td>
                  <td >{{projectdetails.qlcd}}</td>
                </tr>
                <tr >
                  <td class="column">涵洞断面形式：</td>
                  <td >{{projectdetails.hddmxs}}</td>
                  <td class="column">涵洞填土情况：</td>
                  <td >{{projectdetails.hdttqk}}</td>
                  <td class="column">水力性质分类：</td>
                  <td >{{projectdetails.slxzfl}}</td>
                </tr>
                <tr >
                  <td class="column">道路工程类型：</td>
                  <td >{{projectdetails.dlgclx}}</td>
                  <td class="column">路面种类：</td>
                  <td >{{projectdetails.lmzl}}</td>
                  <td class="column">道路等级：</td>
                  <td >{{projectdetails.dldj}}</td>
                </tr>
                <tr >
                  <td class="column">车道数：</td>
                  <td >{{projectdetails.cds}}</td>
                  <td class="column">设计车速：</td>
                  <td >{{projectdetails.sjcs}}</td>
                  <td class="column">道路荷载：</td>
                  <td >{{projectdetails.dlhz}}</td>
                </tr>
                <tr >
                  <td class="column">道路起点里程：</td>
                  <td >{{projectdetails.dlqdlc}}</td>
                  <td class="column">道路讫点里程：</td>
                  <td >{{projectdetails.dlqidlc}}</td>
                  <td class="column">道路长度：</td>
                  <td >{{projectdetails.dlcd}}</td>
                </tr>
                <tr >
                  <td class="column">路基类型：</td>
                  <td >{{projectdetails.ljlxName}}</td>
                  <td class="column">路基材质：</td>
                  <td >{{projectdetails.ljcz}}</td>
                  <td class="column">道路地基持力层岩层类型：</td>
                  <td >{{projectdetails.dldjclcyclx}}</td>
                </tr>
                <tr >
                  <td class="column">道路地基持力层承载力：</td>
                  <td >{{projectdetails.dldjclcczl}}</td>
                  <td class="column">路面材质：</td>
                  <td >{{projectdetails.lmcz}}</td>
                  <td class="column">路面材质年限：</td>
                  <td >{{projectdetails.lmcznx}}</td>
                </tr>
                <tr >
                  <td class="column">道路最大纵坡：</td>
                  <td >{{projectdetails.dlzdzp}}</td>
                  <td class="column">道路最小纵坡：</td>
                  <td >{{projectdetails.dlzxzp}}</td>
                  <td class="column">路面宽度：</td>
                  <td >{{projectdetails.lmkd}}</td>
                </tr>
                <tr >
                  <td class="column">道路幅宽：</td>
                  <td >{{projectdetails.dlfk}}</td>
                  <td class="column">路面设计使用年限：</td>
                  <td >{{projectdetails.lmsjsynx}}</td>
                  <td class="column">轨道交通类型：</td>
                  <td >{{projectdetails.gdjtlx}}</td>
                </tr>
                <tr >
                  <td class="column">轨道运营性质：</td>
                  <td >{{projectdetails.gdyyxz}}</td>
                  <td class="column">轨道运行方式：</td>
                  <td >{{projectdetails.gdyxfs}}</td>
                  <td class="column">设计列车速度：</td>
                  <td >{{projectdetails.sjlcsd}}</td>
                </tr>
                <tr >
                  <td class="column">轨道运营速度分类：</td>
                  <td >{{projectdetails.gdyysdfl}}</td>
                  <td class="column">轨道荷载：</td>
                  <td >{{projectdetails.gdhz}}</td>
                  <td class="column">轨道长度：</td>
                  <td >{{projectdetails.gdcd}}</td>
                </tr>
                <tr >
                  <td class="column">轨道起点里程：</td>
                  <td >{{projectdetails.gdqdlc}}</td>
                  <td class="column">轨道讫点里程：</td>
                  <td >{{projectdetails.gdqidlc}}</td>
                  <td class="column">轨道基础形式：</td>
                  <td >{{projectdetails.gdjcxs}}</td>
                </tr>
                <tr >
                  <td class="column">轨道材质：</td>
                  <td >{{projectdetails.gdcz}}</td>
                  <td class="column">轨道材质年限：</td>
                  <td >{{projectdetails.gdcznx}}</td>
                  <td class="column">轨道最小纵坡：</td>
                  <td >{{projectdetails.gdzxzp}}</td>
                </tr>
                <tr >
                  <td class="column">轨道最大纵坡：</td>
                  <td >{{projectdetails.gdzdzp}}</td>
                  <td class="column">轨道幅宽：</td>
                  <td >{{projectdetails.gdfk}}</td>
                  <td class="column">轨道地基持力层岩层类型：</td>
                  <td >{{projectdetails.gddjclcyzlx}}</td>
                </tr>
                <tr >
                  <td class="column">轨道地基持力层承载力：</td>
                  <td >{{projectdetails.gddjclcczl}}</td>
                  <td class="column">车站名：</td>
                  <td colspan="3">{{projectdetails.czm}}</td>
                </tr>
              </table>
              <table class="mailTable" v-if="ProjectBuildFlag">
                <tr>
                  <td class="column">栋数：</td>
                  <td >{{projectdetails.ds}}</td>
                  <td class="column">高度：</td>
                  <td >{{projectdetails.gd}}</td>
                </tr>
                <tr>
                  <td class="column">层数（地上）：</td>
                  <td >{{projectdetails.dscs}}</td>
                  <td class="column">层数（地下）：</td>
                  <td >{{projectdetails.dxcs}}</td>
                </tr>

              </table>
              <table class="mailTable" v-if="ProjectPipelineFlag">
                <tr>
                  <thead>专业信息</thead>
                </tr>
                <tr >
                  <td class="column">管线工程类型：</td>
                  <td >{{projectdetails.gxgclx}}</td>
                  <td class="column">管线位置：</td>
                  <td >{{projectdetails.gxwz}}</td>
                  <td class="column">地形图号：</td>
                  <td >{{projectdetails.dxth}}</td>
                </tr>
                <tr >
                  <td class="column">管线工程现状：</td>
                  <td >{{projectdetails.gxgcxz}}</td>
                  <td class="column">管线埋设方式：</td>
                  <td >{{projectdetails.gxmsfs}}</td>
                  <td class="column">给排水流向：</td>
                  <td >{{projectdetails.gpslx}}</td>
                </tr>
                <tr >
                  <td class="column">管线类型：</td>
                  <td >{{projectdetails.gxlx}}</td>
                  <td class="column">管线起点：</td>
                  <td >{{projectdetails.gxqd}}</td>
                  <td class="column">管线止点：</td>
                  <td >{{projectdetails.gxzd}}</td>
                </tr>
                <tr >
                  <td class="column">管线等级：</td>
                  <td >{{projectdetails.gxdj}}</td>
                  <td class="column">起点埋深：</td>
                  <td >{{projectdetails.qdms}}</td>
                  <td class="column">止点埋深：</td>
                  <td >{{projectdetails.zdms}}</td>
                </tr>
                <tr >
                  <td class="column">设计埋设年限：</td>
                  <td >{{projectdetails.sjmsnx}}</td>
                  <td class="column">长度：</td>
                  <td >{{projectdetails.cd}}</td>
                  <td class="column">规格：</td>
                  <td >{{projectdetails.gg}}</td>
                </tr>
                <tr >
                  <td class="column">材质：</td>
                  <td >{{projectdetails.cz}}</td>
                  <td class="column">材质年限：</td>
                  <td >{{projectdetails.cznx}}</td>
                  <td class="column">井总数：</td>
                  <td >{{projectdetails.jzs}}</td>
                </tr>
                <tr >
                  <td class="column">井盖形状：</td>
                  <td >{{projectdetails.jgxz}}</td>
                  <td class="column">井盖尺寸：</td>
                  <td >{{projectdetails.jgcc}}</td>
                  <td class="column">平均井间距离：</td>
                  <td >{{projectdetails.pjjjjl}}</td>
                </tr>
                <tr >
                  <td class="column">设计压力：</td>
                  <td >{{projectdetails.sjyl}}</td>
                  <td class="column">载荷：</td>
                  <td >{{projectdetails.zh}}</td>
                  <td class="column">总孔数：</td>
                  <td >{{projectdetails.zks}}</td>
                </tr>
                <tr >
                  <td class="column">已用孔数：</td>
                  <td >{{projectdetails.yyks}}</td>
                  <td class="column">探测日期：</td>
                  <td >{{projectdetails.tcrq}}</td>
                  <td class="column">所在位置：</td>
                  <td >{{projectdetails.szwz}}</td>
                </tr>
                <tr >
                  <td class="column">测量单位：</td>
                  <td >{{projectdetails.cldw}}</td>
                  <td class="column">权属单位：</td>
                  <td >{{projectdetails.qsdw}}</td>
                  <td class="column">维护单位：</td>
                  <td >{{projectdetails.whdw}}</td>
                </tr>
                <tr >
                  <td class="column">断面形式：</td>
                  <td colspan="5">{{projectdetails.dmxs}}</td>
                </tr>
              </table>
              <table class="mailTable" v-if="ProjectRoadFlag">
                <tr >
                  <td class="column">宽度：</td>
                  <td >{{projectdetails.kd}}</td>
                  <td class="column">高度：</td>
                  <td >{{projectdetails.gd}}</td>
                </tr>
                <tr >
                  <td class="column">跨径：</td>
                  <td >{{projectdetails.kj}}</td>
                  <td class="column">孔数：</td>
                  <td >{{projectdetails.ks}}</td>
                </tr>
                <tr >
                  <td class="column">级别：</td>
                  <td >{{projectdetails.jb}}</td>
                  <td class="column">荷载：</td>
                  <td >{{projectdetails.hz}}</td>
                </tr>
                <tr >
                  <td class="column">净空：</td>
                  <td >{{projectdetails.jk}}</td>
                  <td class="column">长度：</td>
                  <td >{{projectdetails.cd}}</td>
                </tr>
              </table>
             <table class="mailTable" v-if="ProjectTunnelFlag">
         
                <tr >
                  <td class="column">隧道工程类型：</td>
                  <td >{{projectdetails.sdgclx}}</td>
                  <td class="column">围岩级别：</td>
                  <td >{{projectdetails.wyjb}}</td>
                  <td class="column">隧道功能用途：</td>
                  <td >{{projectdetails.sdgnyt}}</td>
                </tr>
                <tr >
                  <td class="column">隧道长度等级：</td>
                  <td >{{projectdetails.sdcddj}}</td>
                  <td class="column">结构形式：</td>
                  <td >{{projectdetails.dmlx}}</td>
                  <td class="column">洞门类型：</td>
                  <td >{{projectdetails.sjcs}}</td>
                </tr>
                <tr >
                  <td class="column">横断面面积分类：</td>
                  <td >{{projectdetails.hdmmjfl}}</td>
                  <td class="column">隧道埋置深度分类：</td>
                  <td >{{projectdetails.sdmzsdfl}}</td>
                  <td class="column">横断面面积：</td>
                  <td >{{projectdetails.hdmmj}}</td>
                </tr>
                <tr >
                  <td class="column">隧道所处地质条件：</td>
                  <td >{{projectdetails.sdscdztj}}</td>
                  <td class="column">隧道长度：</td>
                  <td >{{projectdetails.sdcd}}</td>
                  <td class="column">路（轨）面以上净空面积：</td>
                  <td >{{projectdetails.lmysjkmj}}</td>
                </tr>
                <tr >
                  <td class="column">轨道交通类型：</td>
                  <td >{{projectdetails.gdjtlx}}</td>
                  <td class="column">轨道运营性质：</td>
                  <td >{{projectdetails.gdyyxz}}</td>
                  <td class="column">轨道运营速度分类：</td>
                  <td >{{projectdetails.gdyysdfl}}</td>
                </tr>
                <tr >
                  <td class="column">轨道荷载：</td>
                  <td >{{projectdetails.gdhz}}</td>
                  <td class="column">轨道运行方式：</td>
                  <td >{{projectdetails.gdyxfs}}</td>
                  <td class="column">设计列车速度：</td>
                  <td >{{projectdetails.sjlcsd}}</td>
                </tr>
                <tr >
                  <td class="column">轨道长度：</td>
                  <td >{{projectdetails.gdcd}}</td>
                  <td class="column">车站名：</td>
                  <td >{{projectdetails.czm}}</td>
                  <td class="column">轨道地基持力层承载力：</td>
                  <td >{{projectdetails.gddjclcczl}}</td>
                </tr>
                <tr >
                  <td class="column">轨道起点里程：</td>
                  <td >{{projectdetails.gdqdlc}}</td>
                  <td class="column">轨道讫点里程：</td>
                  <td >{{projectdetails.gdqidlc}}</td>
                  <td class="column">轨道基础形式：</td>
                  <td >{{projectdetails.gdjcxs}}</td>
                </tr>
                <tr >
                  <td class="column">轨道材质：</td>
                  <td >{{projectdetails.gdcz}}</td>
                  <td class="column">轨道材质年限：</td>
                  <td >{{projectdetails.gdcznx}}</td>
                  <td class="column">轨道最小纵坡：</td>
                  <td >{{projectdetails.gdzxzp}}</td>
                </tr>
                <tr >
                  <td class="column">轨道最大纵坡：</td>
                  <td >{{projectdetails.gdzdzp}}</td>
                  <td class="column">轨道幅宽：</td>
                  <td >{{projectdetails.gdfk}}</td>
                  <td class="column">轨道地基持力层岩层类型：</td>
                  <td >{{projectdetails.gddjclcyclx}}</td>
                </tr>
                <tr >
                  <td class="column">道路工程类型：</td>
                  <td >{{projectdetails.dlgclx}}</td>
                  <td class="column">路面种类：</td>
                  <td >{{projectdetails.lmzl}}</td>
                  <td class="column">道路等级：</td>
                  <td >{{projectdetails.dldj}}</td>
                </tr>
                <tr >
                  <td class="column">车道数：</td>
                  <td >{{projectdetails.cds}}</td>
                  <td class="column">设计车速：</td>
                  <td >{{projectdetails.sjcs}}</td>
                  <td class="column">道路荷载：</td>
                  <td >{{projectdetails.dlhz}}</td>
                </tr>
                <tr >
                  <td class="column">道路起点里程：</td>
                  <td >{{projectdetails.dlqdlc}}</td>
                  <td class="column">道路讫点里程：</td>
                  <td >{{projectdetails.dlqidlc}}</td>
                  <td class="column">道路长度：</td>
                  <td >{{projectdetails.dlcd}}</td>
                </tr>
                <tr >
                  <td class="column">路基类型：</td>
                  <td >{{projectdetails.ljlx}}</td>
                  <td class="column">路基材质：</td>
                  <td >{{projectdetails.ljcz}}</td>
                  <td class="column">道路地基持力层岩层类型：</td>
                  <td >{{projectdetails.dldjclcyclx}}</td>
                </tr>
                <tr >
                  <td class="column">道路地基持力层承载力：</td>
                  <td >{{projectdetails.dldjclcczl}}</td>
                  <td class="column">路面材质：</td>
                  <td >{{projectdetails.lmcz}}</td>
                  <td class="column">路面材质年限：</td>
                  <td >{{projectdetails.lmcznx}}</td>
                </tr>
                <tr >
                  <td class="column">道路最大纵坡：</td>
                  <td >{{projectdetails.dlzdzp}}</td>
                  <td class="column">道路最小纵坡：</td>
                  <td >{{projectdetails.dlzxzp}}</td>
                  <td class="column">路面宽度：</td>
                  <td >{{projectdetails.lmkd}}</td>
                </tr>
                <tr >
                  <td class="column">道路幅宽：</td>
                  <td >{{projectdetails.dlfk}}</td>
                  <td class="column">路面设计使用年限：</td>
                  <td >{{projectdetails.lmsjsynx}}</td>
                </tr>
              </table>
             <table class="mailTable" v-if="ProjectTrackLFlag">
             
                <tr >
                  <td class="column">轨道交通类型：</td>
                  <td >{{projectdetails.gdjtlx}}</td>
                  <td class="column">轨道运营性质：</td>
                  <td >{{projectdetails.gdyyxz}}</td>
                  <td class="column">轨道运行方式：</td>
                  <td >{{projectdetails.gdyxfs}}</td>
                </tr>
                <tr >
                  <td class="column">设计列车速度：</td>
                  <td >{{projectdetails.sjlcsd}}</td>
                  <td class="column">轨道荷载：</td>
                  <td >{{projectdetails.gdhz}}</td>
                  <td class="column">轨道运营速度分类：</td>
                  <td >{{projectdetails.gdyysdfl}}</td>
                </tr>
                <tr >
                  <td class="column">轨道起点里程：</td>
                  <td >{{projectdetails.gdqdlc}}</td>
                  <td class="column">轨道讫点里程：</td>
                  <td >{{projectdetails.gdqidlc}}</td>
                  <td class="column">轨道长度：</td>
                  <td >{{projectdetails.gdcd}}</td>
                </tr>
                <tr >
                  <td class="column">轨道材质：</td>
                  <td >{{projectdetails.gdcz}}</td>
                  <td class="column">轨道材质年限：</td>
                  <td >{{projectdetails.gdcznx}}</td>
                  <td class="column">轨道基础形式：</td>
                  <td >{{projectdetails.gdjcxs}}</td>
                </tr>
                <tr >
                  <td class="column">轨道最大纵坡：</td>
                  <td >{{projectdetails.gdzdzp}}</td>
                  <td class="column">轨道幅宽：</td>
                  <td >{{projectdetails.gdfk}}</td>
                  <td class="column">轨道最小纵坡：</td>
                  <td >{{projectdetails.gdzxzp}}</td>
                </tr>
                <tr >
                  <td class="column">地基持力层承载力：</td>
                  <td >{{projectdetails.djclcczl}}</td>
                  <td class="column">地基持力层岩层类型：</td>
                  <td >{{projectdetails.djclcyclx}}</td>
                  <td class="column">车站名：</td>
                  <td >{{projectdetails.czm}}</td>
                </tr>
              </table> -->
        <!-- 单位工程专业专业信息注销 E -->

    <!-- 归档信息 -->

    <table class="mailTable" >
      <tr>
        <thead>归档信息</thead>
      </tr>
      <tr >
          <td class="column">总卷数：</td>
          <td >{{FileCount.filesNum}}</td>
          <td class="column">文字（页）：</td>
          <td >{{FileCount.wzNum}}</td>
          
        </tr>
        <tr >
          <td class="column">图纸：</td>
          <td >0（卷）{{FileCount.tzNum}}（张）</td>
          <td class="column">底片：</td>
          <td >{{FileCount.dpNum}}</td>
        </tr>
        <tr >
          <td class="column">照片：</td>
          <td >{{FileCount.zpNum}}</td>
          <td class="column">光盘：</td>
          <td >{{FileCount.gpNum}}</td>
        </tr>
      <tr >
        <td class="column">录音带：</td>
        <td >{{FileCount.lydNum}}</td>
        <td class="column">录像带：</td>
        <td >{{FileCount.lxdNum}}</td>
      </tr>
      <tr >
        <td class="column">保管期限：</td>
        <td >{{projectdetails.bgqxName}}</td>
        <td class="column">密级：</td>
        <td >{{projectdetails.mjName}}</td>
      </tr>
      <tr >
        <td class="column">进馆日期：</td>
        <td >{{projectdetails.jgrq | formatDate}}</td>
        <td class="column">移交单位：</td>
        <td >{{projectdetails.yjdw}}</td>
      </tr>
    </table>
       <!-- 排检与编号 -->
    <table class="mailTable" >
      <tr>
        <thead>排检与编号</thead>
      </tr>
      <tr >
          <td class="column">档号：</td>
          <td >{{FileCount.dwgcdh}}</td>
          <td class="column">原档号：</td>
          <td >{{FileCount.ydh}}</td>
        </tr>
      <tr >
          <td class="column">存放位置起始号：</td>
          <td :colspan="3">{{FileCount.cfwzqsh}}</td>
        </tr>
        
    </table>
  </el-scrollbar>
  </div>
</template>


<script>
import {
  GetUtilizationFileCount
} from "@/api/utilization"
import {
  getArchivesCateList
} from '@/api/archivesCate'
import {
  getEngineeringType
} from '@/api/digitization/projectAPI'
import {
  searchProjectProjectId
} from '@/api/RecorSearch/recorsearch'
import {
  getUtilizeUseEngineeringListSide,
  getOfflineProjectListEngineeringId,
  getUtilizeUseFilesListProjectId,
  getUtilizeUseFileListFilesId,
  getUtilizeUseFilesListEngineeringId,
  getOfflineFileCount,
  getOfflineProjectBuildList,// 获取建筑工程专业信息
  getOfflineProjectBridgeList,// 获取桥涵工程专业信息
  getOfflineProjectPipelineList,// 获取管线工程专业信息
  getOfflineProjectTrackList,// 获取轨道工程专业信息
  getOfflineProjectRoadList,// 获取道路工程专业信息
  getOfflineProjectTunnelList,//获取隧道工程专业信息
} from '@/api/OfflineManage'

export default {
  name: 'specialtyDetails',
  props: {
    project_id: {
      type: String,
      default: ''
    },
    source: {
      type: String,
      default: ''
    },
    zt: {
      type: String,
      default: ''
    },
    pId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
     FileCount:{},//归档信息
      loading:true, //信息正在加载中
      // 具体的专业信息名称
      projectName: '',
      projectId: '',
      archivesCateList:[],//单位工程类型
      storagePeriod:[],//保管期限
      secretGrade: [], // 密级
      // 专业信息表单
      professionalInfoForm: {},
      roadType: [], // 道路工程类型
      pavementType: [],  // 路面种类
      roadGrade: [], // 道路等级
      subgradeType: [], // 路基类型
      subgradeMaterial: [], // 路基材质
      pavementMaterial: [], // 路面材质
      architecture: [], // 建筑工程类型
      basicForm: [],  // 建筑工程基础形式
      buildType: [],  // 构筑物建筑类型
      structureType: [],  // 结构类型
      defenseLevel: [], // 人防等级
      wallType: [], // 外墙形式
      roofType: [], // 屋顶形式
      trafficType: [], // 轨道交通类型
      operateType: [],  // 轨道运营性质
      functionType: [], // 轨道运行方式
      operateSpeedType: [], // 轨道运营速度分类
      trackBasicsType: [], // 轨道基础形式
      bridgeType: [], // 桥梁工程类型
      bridgeStructureType: [], // 桥梁结构体系
      bridgeDeckFunType: [], // 桥面功能
      laneLocation: [], // 行车道位置
      obstacleType: [], // 跨越障碍性质
      culvertBuildingType: [], // 涵洞建筑材料
      culvertStructureType: [], // 涵洞构造类型
      culvertSectionType: [], // 涵洞断面形式
      culvertFillingType: [], // 涵洞填土情况
      waterType: [], // 水力性质分类
      tunnelType: [], // 隧道工程类型
      surroundingRockGrade: [], // 围岩级别
      tunnelFunPurpose: [], // 隧道功能用途
      tunnelLengthGrade: [],  // 隧道长度等级
      portalType: [], // 洞门类型
      crossSectionClass: [],  // 横断面面积分类
      tunnelDepthClass: [], // 隧道埋置深度分类
      tunnelGeologicalConditions: [], // 隧道所处地质条件
      pipelineEngineeringType: [], // 管线工程类型
      pipelinePosition: [], // 管线位置
      pipelineSituation: [], // 管线工程现状
      pipelineBurying: [], // 管线埋设方式
      drainage: [], // 给排水流向
      pipelineType: [], // 管线类型
      projectdetails:{},//单位工程详情
      dialogprojectdetailsVisible:false,//单位工程详情 弹层
      digitProjectBridge:{},//专业信息——桥梁工程
      projectdetails:{},//专业信息——建筑工程
      projectdetails:{},//专业信息——管道工程
      projectdetails:{},//专业信息——道路工程
      projectdetails:{},//专业信息——轨道交通工程
      projectdetails:{},//专业信息——隧道
      zyxinxi:'',//专业信息 判断字段
      digitProjectBridge:[],//桥涵工程
      projectdetails:[],//建筑工程
      projectdetails:[],//管线工程
      projectdetails:[],//道路工程
      projectdetails:[],//隧道工程
      projectdetails:[],//轨道交通工程
      // 专业信息 详情 是否显示条件
      ProjectBridgeFlag:false,
      ProjectBuildFlag:false,
      ProjectPipelineFlag:false,
      ProjectRoadFlag:false,
      ProjectTunnelFlag:false,
      ProjectTrackLFlag:false,
      uniProjectList:[],

    }
  },
  watch: {
    source: {
      immediate:true,
      deep: true,
      handler(newVal, oldVal) {
        this.projectName = newVal
      }
    },
    zt: {
      immediate:true,
      deep: true,
      handler(newVal, oldVal) {
        this.zt = newVal
      }
    },
    pId: {
      immediate:true,
      deep: true,
      handler(newVal, oldVal) {
        this.projectId = newVal
        this.getProjectProfeInfoFun()
      }
    },
    project_id:{
      immediate:true,
      deep: true,
      handler(newVal, oldVal) {
        this.project_id = newVal
        
      }
    }
  },
  created() {
    this.gclx = this.$route.query.gclx
    this.engineering_id = this.$route.query.engineering_id
    this.zt = this.$route.query.zt
    this.getUniProjectType() //单位工程类型
    this.getStoragePeriod() //保管期限
    this.getSecretGrade()  // 密级
    this.getRoadEngineeringType() // 道路工程类型
    this.getPavementType()  // 路面种类
    this.getRoadGrade() // 道路等级
    this.getSubgradeType() // 路基类型
    this.getSubgradeMaterial() // 路基材质
    this.getPavementMaterial() // 路面材质
    this.getArchitecturel() // 建筑工程类型
    this.getBasicForm()  // 建筑工程基础形式
    this.getBuildType()  // 构筑物建筑类型
    this.getStructureType()  // 结构类型
    this.getDefenseLevel() // 人防等级
    this.getWallType() // 外墙形式
    this.getRoofType() // 屋顶形式
    this.getTrafficType() // 轨道交通类型
    this.getOperateType()  // 轨道运营性质
    this.getFunctionType() // 轨道运行方式
    this.getOperateSpeedType() // 轨道运营速度分类
    this.getTrackBasicsType() // 轨道基础形式
    this.getBridgeType() // 桥梁工程类型
    this.getBridgeStructureType() // 桥梁结构体系
    this.getBridgeDeckFunType() // 桥面功能
    this.getLaneLocation() // 行车道位置
    this.getObstacleType() // 跨越障碍性质
    this.getCulvertBuildingType() // 涵洞建筑材料
    this.getCulvertStructureType() // 涵洞构造类型
    this.getCulvertSectionType() // 涵洞断面形式
    this.getCulvertFillingType() // 涵洞填土情况
    this.getWaterType() // 水力性质分类
    this.getTunnelType() // 隧道工程类型
    this.getSurroundingRockGrade() // 围岩级别
    this.getTunnelFunPurpose() // 隧道功能用途
    this.getTunnelLengthGrade()  // 隧道长度等级
    this.getPortalType() // 洞门类型
    this.getCrossSectionClass()  // 横断面面积分类
    this.getTunnelDepthClass() // 隧道埋置深度分类
    this.getTunnelGeologicalConditions() // 隧道所处地质条件
    this.getPipelineEngineeringType() // 管线工程类型
    this.getPipelinePosition() // 管线位置
    this.getPipelineSituation() // 管线工程现状
    this.getPipelineBurying() // 管线埋设方式
    this.getDrainage() // 给排水流向
    this.getPipelineType() // 管线类型
    this.GetUtilizationFileCountFun() //归档信息
    this.getUniProjectListFun() //单位列表信息
  },
  methods: {
    //归档信息
    GetUtilizationFileCountFun(){
      const q ={
        project_id:this.project_id
      }
      getOfflineFileCount(q).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         
         this.FileCount = res
        }
      })
    },
       // 根据项目工程id获取单位工程列表
    getUniProjectListFun() {
      this.queryInfo = {
        page_num: 1,
        page_size: 1000,
        dwgcmc: '',
        dwgcdh: '',
        zt:this.zt,
        engineering_id: this.engineering_id
      }
      getOfflineProjectListEngineeringId(this.queryInfo).then(response => {
        
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message: message, type: 'error' })
          res.list.map(v => {
            this.archivesCateList.forEach(t => {
              if (v.dwgclx === t.type_code) {
                v.dwgclxName = t.type_name
              }
              return
            })
            this.structureType.forEach(t => {
              if (v.jglx === t.bm) {
                v.jglxName = t.mc
              }
              return
            })
            return
          })
          this.uniProjectList = res.list
    this.dialogprojectdetailsVisibleFun()
        }
      }).catch(error => {
        console.log(error)
      })
    },

      //单位工程详情
    dialogprojectdetailsVisibleFun(){
      
      // if (this.zt == 'file_status5') {
      //   this.zt
      // } else {
        
      // }
      const q = {
        project_id:this.project_id,
        zt:this.zt
      }
      var res = {}
      this.uniProjectList.forEach(item =>{
        if (item.project_id == this.project_id) {
          res = item
          
           let storagePeriod = JSON.parse(JSON.stringify(this.storagePeriod));  
        storagePeriod.forEach(item =>{
          if (res.bgqx == item.bm) {
            res.bgqxName = item.mc
          }
        })
        let secretGrade = JSON.parse(JSON.stringify(this.secretGrade));  
        secretGrade.forEach(item =>{
          if (res.mj == item.bm) {
            res.mjName = item.mc
          }
        })
          this.projectdetails = res
            this.loading = false
        // this.dialogprojectdetailsVisible = true
        if (res.dwgclx.substr(0,res.dwgclx.indexOf('.')) === 'E2') {
            this.ProjectBridgeFlag = true
            return
          console.log("桥涵工程")
          const q = {
            project_id:this.project_id,
            zt:'file_status3'
          }
          getOfflineProjectBridgeList(q).then(response =>{
            if (response.status === 200) {
            const { data: res, message, status } = response.data
            if (status !== 200) return this.message({ message: message, type: 'error' })
            
            this.ProjectBridgeFlag = true
            this.loading = false
            }
          })
        } else if (res.dwgclx.charAt(0) === 'I') {
            this.ProjectBuildFlag = true
            return
          console.log("建筑工程")
          const q = {
            project_id:this.project_id,
            zt:this.zt
          }
          getOfflineProjectBuildList(q).then(response =>{
            if (response.status === 200) {
            const { data: res, message, status } = response.data
            if (status !== 200) return this.message({ message: message, type: 'error' })
            
            this.ProjectBuildFlag = true
            this.loading = false
            }
          })
          
        } else if (res.dwgclx.charAt(0) === 'Q') {
              this.ProjectPipelineFlag = true
            return
          console.log("管线工程")
          const q = {
            project_id:this.project_id,
            zt:this.zt
          }
          getOfflineProjectPipelineList(q).then(response =>{
            if (response.status === 200) {
            const { data: res, message, status } = response.data
            if (status !== 200) return this.message({ message: message, type: 'error' })
            
            if (res == null) {
              this.ProjectPipelineFlag = false
              this.loading = false
            }else {
              this.ProjectPipelineFlag = true
            }
           
            }
          })
        } else if (res.dwgclx.substr(0,res.dwgclx.indexOf('.')) === 'E1') {
                this.ProjectRoadFlag = true
            return
          console.log("道路工程")
          const q = {
            project_id:this.project_id,
            zt:this.zt
          }
          getOfflineProjectRoadList(q).then(response =>{
            if (response.status === 200) {
            const { data: res, message, status } = response.data
            if (status !== 200) return this.message({ message: message, type: 'error' })
              
              if (res == null) {
                this.ProjectRoadFlag = false
                this.loading = false
              }else {
                this.ProjectRoadFlag = true
              }
            }
          })
        } else if (res.dwgclx.substr(0,res.dwgclx.indexOf('.')) === 'E4') {
                this.ProjectTunnelFlag = true
            return
          console.log("隧道工程")
          const q = {
            project_id:this.project_id,
            zt:this.zt
          }
          getOfflineProjectTunnelList(q).then(response =>{
            if (response.status === 200) {
            const { data: res, message, status } = response.data
            if (status !== 200) return this.message({ message: message, type: 'error' })
              
              if (res == null) {
                this.ProjectTunnelFlag = false
                this.loading = false
              }else {
                this.ProjectTunnelFlag = true
              }
            }
          })
        } else if (res.dwgclx.charAt(0) === 'G') {
                this.ProjectTrackLFlag = true
            return
          console.log("轨道交通工程")
          const q = {
            project_id:this.project_id,
            zt:this.zt
          }
          getOfflineProjectTrackList(q).then(response =>{
            
            if (response.status === 200) {
            const { data: res, message, status } = response.data
            if (status !== 200) return this.message({ message: message, type: 'error' })
              
              if (res == null) {
                this.ProjectTrackLFlag = false
                this.loading = false
              }else {
                this.ProjectTrackLFlag = true
              }
            }
          })
        } else {
          this.loading = false
        }
        }
      })
      return
      searchProjectProjectId(q).then(response =>{
        
        this.dialogprojectdetailsVisible = true

        let resdata = JSON.parse(JSON.stringify(this.archivesCateList));  
        resdata.forEach(item =>{
          if (res.dwgclx == item.type_code) {
            res.dwgclxName = item.type_name
          }

        })
        let storagePeriod = JSON.parse(JSON.stringify(this.storagePeriod));  
        storagePeriod.forEach(item =>{
          if (res.bgqx == item.bm) {
            res.bgqxName = item.mc
          }
        })
        this.projectdetails = res
        let secretGrade = JSON.parse(JSON.stringify(this.secretGrade));  
        secretGrade.forEach(item =>{
          if (res.mj == item.bm) {
            res.mjName = item.mc
          }
        })
   


        return

        this.projectdetails = res.digitProject
        this.digitProjectBridge = res.digitProjectBridge
        this.projectdetails = res.projectdetails
        this.projectdetails = res.projectdetails
        if (res.projectdetails !== null) {
        let pavementMaterial = JSON.parse(JSON.stringify(this.pavementMaterial));
        pavementMaterial.map(item =>{
            if (res.projectdetails.lmcz == item.bm) {
            res.projectdetails.lmczName = item.mc
          
          } 
        })

        let subgradeMaterial = JSON.parse(JSON.stringify(this.subgradeMaterial));
        subgradeMaterial.map(item =>{
          if (res.projectdetails.ljcz == item.bm) {
            res.projectdetails.ljczName = item.mc
          }
        })

        let subgradeType = JSON.parse(JSON.stringify(this.subgradeType));
        subgradeType.map(item =>{
          if (res.projectdetails.ljlx == item.bm) {
            res.projectdetails.ljlxName = item.mc
          }
        })

        let pavementType = JSON.parse(JSON.stringify(this.pavementType));
        pavementType.map(item =>{
          if (res.projectdetails.lmzl == item.bm) {
            res.projectdetails.lmzlName = item.mc
          }
        })

        let roadType = JSON.parse(JSON.stringify(this.roadType));
        roadType.map(item =>{
          if (res.projectdetails.dlgclx == item.bm) {
            res.projectdetails.dlgclxName = item.mc
          }
        })
        }
  

        this.projectdetails = res.projectdetails
        this.projectdetails = res.projectdetails
        this.projectdetails = res.projectdetails
        this.loading = false
      })
    },
    getProjectProfeInfoFun() {
      this.professionalInfoForm = {}
      if (this.projectName === '道路工程') {
        this.getOfflineProjectRoadListFun(this.projectId)
      } else if (this.projectName === '隧道工程') {
        this.getOfflineProjectTunnelListFun(this.projectId)
      } else if (this.projectName === '建筑工程') {
        this.getOfflineProjectBuildListFun(this.projectId)
      } else if (this.projectName === '轨道交通工程') {
        this.getOfflineProjectTrackListFun(this.projectId)
      } else if (this.projectName === '管线工程') {
        this.getOfflineProjectPipelineListFun(this.projectId)
      } else if (this.projectName === '桥涵工程') {
        this.getOfflineProjectBridgeListFun(this.projectId)
      }
    },

    // 取消
    cancel() {
      this.professionalInfoForm = {}
      this.$emit('cancel')
    },

        // 存储所有档案分类
    saveArchivesCateAll(res) {
      res.forEach(v => {
        this.archivesCateList.push(v)
        if (v.child) {
          this.saveArchivesCateAll(v.child)
        }
      })
    },
   // 保管期限
    getStoragePeriod() {
      const q = {
        bm: "BGQX_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.storagePeriod  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },
      // 密级
    getSecretGrade() {
      const q = {
        bm: "MJ_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.secretGrade  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 单位工程类型
    getUniProjectType() {
      getArchivesCateList().then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.saveArchivesCateAll(res)
           setTimeout(() => {
            }, 500)
          
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 保存工程专业信息
    saveProfeInfo() {
      this.professionalInfoForm.project_id = this.projectId
      this.$emit('saveInfo', this.professionalInfoForm)
    },

    // 获取道路工程专业信息
    getOfflineProjectRoadListFun(pid) {
      const q = {
        project_id: pid
      }
      getOfflineProjectRoadList(q).then(response => {
        if (response.status === 200) {
          const { data:res, message, status } = response.data
          if (res !== null) {
            this.professionalInfoForm = res
          }
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 获取隧道工程专业信息
    getOfflineProjectTunnelListFun(pid) {
      const q = {
        project_id: pid
      }
      getOfflineProjectTunnelList(q).then(response => {
        if (response.status === 200) {
          const { data:res, message, status } = response.data
          if (res !== null) {
            this.professionalInfoForm = res
          }
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 获取建筑工程专业信息
    getOfflineProjectBuildListFun(pid) {
      const q = {
        project_id: pid
      }
      getOfflineProjectBuildList(q).then(response => {
        if (response.status === 200) {
          const { data:res, message, status } = response.data
          if (res !== null) {
            this.professionalInfoForm = res
          }
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 获取轨道工程专业信息
    getOfflineProjectTrackListFun(pid) {
      const q = {
        project_id: pid
      }
      getOfflineProjectTrackList(q).then(response => {
        if (response.status === 200) {
          const { data:res, message, status } = response.data
          if (res !== null) {
            this.professionalInfoForm = res
          }
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 获取管线工程专业信息
    getOfflineProjectPipelineListFun(pid) {
      const q = {
        project_id: pid
      }
      getOfflineProjectPipelineList(q).then(response => {
        if (response.status === 200) {
          const { data:res, message, status } = response.data
          if (res !== null) {
            this.professionalInfoForm = res
          }
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 获取桥涵工程专业信息
    getOfflineProjectBridgeListFun(pid) {
      const q = {
        project_id: pid
      }
      getOfflineProjectBridgeList(q).then(response => {
        if (response.status === 200) {
          const { data:res, message, status } = response.data
          if (res !== null) {
            this.professionalInfoForm = res
          }
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 道路工程类型
    getRoadEngineeringType() {
      const q = {
        bm: "DLGCLX_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.roadType = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 路面种类
    getPavementType() {
      const q = {
        bm: "LMZL_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.pavementType  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 道路等级
    getRoadGrade() {
      const q = {
        bm: "DLDJ_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.roadGrade  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 路基类型
    getSubgradeType() {
      const q = {
        bm: "LJLX_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.subgradeType  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 路基材质
    getSubgradeMaterial() {
      const q = {
        bm: "LJCZ_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.subgradeMaterial  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 路面材质
    getPavementMaterial() {
      const q = {
        bm: "LMCZ_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.pavementMaterial  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 建筑工程类型
    getArchitecturel() {
      const q = {
        bm: "JZGCLX_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.architecture  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 建筑工程基础形式
    getBasicForm() {
      const q = {
        bm: "JZGCJCXS_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.basicForm  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 构筑物建筑类型
    getBuildType() {
      const q = {
        bm: "GZWJZLX_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.buildType  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 结构类型
    getStructureType() {
      const q = {
        bm: "JGLX_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.structureType  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 人防等级
    getDefenseLevel() {
      const q = {
        bm: "RFDJ_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.defenseLevel  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 外墙形式
    getWallType() {
      const q = {
        bm: "WQXS_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.wallType  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 屋顶形式
    getRoofType() {
      const q = {
        bm: "WDXS_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.roofType  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 轨道交通类型
    getTrafficType() {
      const q = {
        bm: "GDJTLX_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.trafficType  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 轨道运营性质
    getOperateType() {
      const q = {
        bm: "GDYYXZ_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.operateType  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 轨道运行方式
    getFunctionType() {
      const q = {
        bm: "GDYXFS_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.functionType  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 轨道运营速度分类
    getOperateSpeedType() {
      const q = {
        bm: "GDYYSDFL_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.operateSpeedType  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 轨道基础形式
    getTrackBasicsType() {
      const q = {
        bm: "GDJCXS_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.trackBasicsType  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 桥梁工程类型
    getBridgeType() {
      const q = {
        bm: "QLGCLX_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.bridgeType  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 桥梁结构体系
    getBridgeStructureType() {
      const q = {
        bm: "QLJGTX_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.bridgeStructureType  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 桥面功能
    getBridgeDeckFunType() {
      const q = {
        bm: "QMGC_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.bridgeDeckFunType  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 行车道位置
    getLaneLocation() {
      const q = {
        bm: "XCDWZ_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.laneLocation  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 跨越障碍性质
    getObstacleType() {
      const q = {
        bm: "KYZAXZ_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.obstacleType  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 涵洞建筑材料
    getCulvertBuildingType() {
      const q = {
        bm: "HDJZCL_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.culvertBuildingType  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 涵洞构造类型
    getCulvertStructureType() {
      const q = {
        bm: "HDGZLX_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.culvertStructureType  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 涵洞断面形式
    getCulvertSectionType() {
      const q = {
        bm: "HDDMXS_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.culvertSectionType  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 涵洞填土情况
    getCulvertFillingType() {
      const q = {
        bm: "HDTTQK_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.culvertFillingType  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 水力性质分类
    getWaterType() {
      const q = {
        bm: "SLXZFL_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.waterType  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 隧道工程类型
    getTunnelType() {
      const q = {
        bm: "SDGCLX_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.tunnelType  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 围岩级别
    getSurroundingRockGrade() {
      const q = {
        bm: "WYJB_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.surroundingRockGrade  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 隧道功能用途
    getTunnelFunPurpose() {
      const q = {
        bm: "SDGNYT_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.tunnelFunPurpose  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 隧道长度等级
    getTunnelLengthGrade() {
      const q = {
        bm: "SDCDDJ_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.tunnelLengthGrade  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 洞门类型
    getPortalType() {
      const q = {
        bm: "DMLX_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.portalType  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 横断面面积分类
    getCrossSectionClass() {
      const q = {
        bm: "HDMMJFL_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.crossSectionClass  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 隧道埋置深度分类
    getTunnelDepthClass() {
      const q = {
        bm: "SDMZSDFL_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.tunnelDepthClass  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 隧道所处地质条件
    getTunnelGeologicalConditions() {
      const q = {
        bm: "SDSCDZTJ_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.tunnelGeologicalConditions  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 管线工程类型
    getPipelineEngineeringType() {
      const q = {
        bm: "CSGXGCLX_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.pipelineEngineeringType  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 管线位置
    getPipelinePosition() {
      const q = {
        bm: "GXWZ_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.pipelinePosition  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 管线工程现状
    getPipelineSituation() {
      const q = {
        bm: "GXGCXZ_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.pipelineSituation  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 管线埋设方式
    getPipelineBurying() {
      const q = {
        bm: "GXMSFS_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.pipelineBurying  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 给排水流向
    getDrainage() {
      const q = {
        bm: "GPSLX_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.drainage  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 管线类型
    getPipelineType() {
      const q = {
        bm: "GXLX_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.pipelineType  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },
  }
}
</script>

<style lang="less">
.form{
  .form-true{
    @media all and (min-width:1290px) { 
          .el-form-item { 
           width:30% !important;
           margin-right:20px !important;
          } 
      }
      @media all and (max-width:1290px) { 
          .el-form-item { 
           width:42% !important;
           margin-right:20px !important;
          } 
      }
      
      
    .position{
      .hover{
        position: relative;
        .tips{
          position: absolute;
          top:-170px;
          left: 10px;
          width:200px;
          padding:10px;
          line-height: 20px;
          border-radius: 5px;
          z-index:99999;
          border:1px solid #eee;
          background: #eee;
          display: none;
        }
      }
      .hover:hover{
        .tips{
          display: block;
        }
      }
    }
    .btn{
      width:100% !important;
      margin-top:20px;
      margin-right:0;
      display: flex;
      justify-content: center;
    }
    .el-form-item__content{
      .el-input{
        width:220px;
        margin-right:5px;
      }
    }
  }
}

</style>
<style lang="less" scoped>
/deep/ .el-scrollbar {
    padding-bottom: 30px;
  box-sizing: border-box;
	.el-scrollbar__wrap {
		max-height: 600px; // 最大高度
		overflow-x: hidden; // 隐藏横向滚动栏
	}
}
    .mailTable {width: 100%;}
    .mailTable tr thead {line-height: 40px;font-size: 18px;font-weight: 700;}
　　.mailTable, .mailTable tr, .mailTable tr td{ border:1px solid #E6EAEE; }
　　.mailTable{ font-size: 14px; color: #71787E; }
　　.mailTable tr td{ border:1px solid #E6EAEE; width: 280px; height: 45px; line-height: 35px; box-sizing: border-box; padding: 0 10px; }
    .mailTable tr td:nth-child(odd) {text-align: right;}
　　.mailTable tr td.column { background-color: #EFF3F6; color: #393C3E; }
    .column-top {width: 80%;}
</style>
