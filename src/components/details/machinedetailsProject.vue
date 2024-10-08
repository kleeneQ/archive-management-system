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
            <!-- 桥梁工程类型： -->
             <table class="mailTable" v-if="ProjectBridgeFlag">
                <tr>
                  <thead>专业信息</thead>
                </tr>
                <tr >
                  <td class="column">桥梁工程类型：</td>
                  <td >{{digitProjectBridge.qlgclx}}</td>
                  <td class="column">桥梁结构体系：</td>
                  <td >{{digitProjectBridge.qljgtx}}</td>
                  <td class="column">桥面功能：</td>
                  <td >{{digitProjectBridge.qmgn}}</td>
                </tr>
                <tr >
                  <td class="column">桥梁材料：</td>
                  <td >{{digitProjectBridge.qlcl}}</td>
                  <td class="column">桥梁荷载：</td>
                  <td >{{digitProjectBridge.qlhz}}</td>
                  <td class="column">行车道位置：</td>
                  <td >{{digitProjectBridge.xcdwz}}</td>
                </tr>
                <tr >
                  <td class="column">跨越障碍性质：</td>
                  <td >{{digitProjectBridge.kyzaxz}}</td>
                  <td class="column">桥梁建筑高度：</td>
                  <td >{{digitProjectBridge.qljzgd}}</td>
                  <td class="column">桥下净空高度：</td>
                  <td >{{digitProjectBridge.qxjkgd}}</td>
                </tr>
                <tr >
                  <td class="column">涵洞建筑材料：</td>
                  <td >{{digitProjectBridge.hdjzcl}}</td>
                  <td class="column">涵洞构造类型：</td>
                  <td >{{digitProjectBridge.hdgzlx}}</td>
                  <td class="column">桥梁长度：</td>
                  <td >{{digitProjectBridge.qlcd}}</td>
                </tr>
                <tr >
                  <td class="column">涵洞断面形式：</td>
                  <td >{{digitProjectBridge.hddmxs}}</td>
                  <td class="column">涵洞填土情况：</td>
                  <td >{{digitProjectBridge.hdttqk}}</td>
                  <td class="column">水力性质分类：</td>
                  <td >{{digitProjectBridge.slxzfl}}</td>
                </tr>
                <tr >
                  <td class="column">道路工程类型：</td>
                  <td >{{digitProjectBridge.dlgclx}}</td>
                  <td class="column">路面种类：</td>
                  <td >{{digitProjectBridge.lmzl}}</td>
                  <td class="column">道路等级：</td>
                  <td >{{digitProjectBridge.dldj}}</td>
                </tr>
                <tr >
                  <td class="column">车道数：</td>
                  <td >{{digitProjectBridge.cds}}</td>
                  <td class="column">设计车速：</td>
                  <td >{{digitProjectBridge.sjcs}}</td>
                  <td class="column">道路荷载：</td>
                  <td >{{digitProjectBridge.dlhz}}</td>
                </tr>
                <tr >
                  <td class="column">道路起点里程：</td>
                  <td >{{digitProjectBridge.dlqdlc}}</td>
                  <td class="column">道路讫点里程：</td>
                  <td >{{digitProjectBridge.dlqidlc}}</td>
                  <td class="column">道路长度：</td>
                  <td >{{digitProjectBridge.dlcd}}</td>
                </tr>
                <tr >
                  <td class="column">路基类型：</td>
                  <td >{{digitProjectBridge.ljlxName}}</td>
                  <td class="column">路基材质：</td>
                  <td >{{digitProjectBridge.ljcz}}</td>
                  <td class="column">道路地基持力层岩层类型：</td>
                  <td >{{digitProjectBridge.dldjclcyclx}}</td>
                </tr>
                <tr >
                  <td class="column">道路地基持力层承载力：</td>
                  <td >{{digitProjectBridge.dldjclcczl}}</td>
                  <td class="column">路面材质：</td>
                  <td >{{digitProjectBridge.lmcz}}</td>
                  <td class="column">路面材质年限：</td>
                  <td >{{digitProjectBridge.lmcznx}}</td>
                </tr>
                <tr >
                  <td class="column">道路最大纵坡：</td>
                  <td >{{digitProjectBridge.dlzdzp}}</td>
                  <td class="column">道路最小纵坡：</td>
                  <td >{{digitProjectBridge.dlzxzp}}</td>
                  <td class="column">路面宽度：</td>
                  <td >{{digitProjectBridge.lmkd}}</td>
                </tr>
                <tr >
                  <td class="column">道路幅宽：</td>
                  <td >{{digitProjectBridge.dlfk}}</td>
                  <td class="column">路面设计使用年限：</td>
                  <td >{{digitProjectBridge.lmsjsynx}}</td>
                  <td class="column">轨道交通类型：</td>
                  <td >{{digitProjectBridge.gdjtlx}}</td>
                </tr>
                <tr >
                  <td class="column">轨道运营性质：</td>
                  <td >{{digitProjectBridge.gdyyxz}}</td>
                  <td class="column">轨道运行方式：</td>
                  <td >{{digitProjectBridge.gdyxfs}}</td>
                  <td class="column">设计列车速度：</td>
                  <td >{{digitProjectBridge.sjlcsd}}</td>
                </tr>
                <tr >
                  <td class="column">轨道运营速度分类：</td>
                  <td >{{digitProjectBridge.gdyysdfl}}</td>
                  <td class="column">轨道荷载：</td>
                  <td >{{digitProjectBridge.gdhz}}</td>
                  <td class="column">轨道长度：</td>
                  <td >{{digitProjectBridge.gdcd}}</td>
                </tr>
                <tr >
                  <td class="column">轨道起点里程：</td>
                  <td >{{digitProjectBridge.gdqdlc}}</td>
                  <td class="column">轨道讫点里程：</td>
                  <td >{{digitProjectBridge.gdqidlc}}</td>
                  <td class="column">轨道基础形式：</td>
                  <td >{{digitProjectBridge.gdjcxs}}</td>
                </tr>
                <tr >
                  <td class="column">轨道材质：</td>
                  <td >{{digitProjectBridge.gdcz}}</td>
                  <td class="column">轨道材质年限：</td>
                  <td >{{digitProjectBridge.gdcznx}}</td>
                  <td class="column">轨道最小纵坡：</td>
                  <td >{{digitProjectBridge.gdzxzp}}</td>
                </tr>
                <tr >
                  <td class="column">轨道最大纵坡：</td>
                  <td >{{digitProjectBridge.gdzdzp}}</td>
                  <td class="column">轨道幅宽：</td>
                  <td >{{digitProjectBridge.gdfk}}</td>
                  <td class="column">轨道地基持力层岩层类型：</td>
                  <td >{{digitProjectBridge.gddjclcyzlx}}</td>
                </tr>
                <tr >
                  <td class="column">轨道地基持力层承载力：</td>
                  <td >{{digitProjectBridge.gddjclcczl}}</td>
                  <td class="column">车站名：</td>
                  <td colspan="3">{{digitProjectBridge.czm}}</td>
                </tr>
              </table>
              <!-- 建筑工程类型： -->
              <table class="mailTable" v-if="ProjectBuildFlag">
                <tr>
                  <thead>专业信息</thead>
                </tr>
                <tr >
                  <td class="column">建筑工程类型：</td>
                  <td >{{digitProjectBuild.jzgclx}}</td>
                  <td class="column">建筑工程基础形式：</td>
                  <td >{{digitProjectBuild.jzgcjcxs}}</td>
                  <td class="column">构筑物建筑类型：</td>
                  <td >{{digitProjectBuild.gzwjzlx}}</td>
                </tr>
                <tr >
                  <td class="column">结构类型：</td>
                  <td >{{digitProjectBuild.jglx}}</td>
                  <td class="column">地基持力层岩层类型：</td>
                  <td >{{digitProjectBuild.djclcyclx}}</td>
                  <td class="column">地基持力层承载力：</td>
                  <td >{{digitProjectBuild.djclcczl}}</td>
                </tr>
                <tr >
                  <td class="column">建筑面积：</td>
                  <td >{{digitProjectBuild.jzmj}}</td>
                  <td class="column">户数：</td>
                  <td >{{digitProjectBuild.hs}}</td>
                  <td class="column">人防等级：</td>
                  <td >{{digitProjectBuild.rfdj}}</td>
                </tr>
                <tr >
                  <td class="column">地上建筑高度：</td>
                  <td >{{digitProjectBuild.dsjzgd}}</td>
                  <td class="column">地下建筑高度：</td>
                  <td >{{digitProjectBuild.dxjzgd}}</td>
                  <td class="column">结构最大跨度：</td>
                  <td >{{digitProjectBuild.jgzdkd}}</td>
                </tr>
                <tr >
                  <td class="column">地上层数：</td>
                  <td >{{digitProjectBuild.dscs}}</td>
                  <td class="column">地下层数：</td>
                  <td >{{digitProjectBuild.dxcs}}</td>
                  <td class="column">最小基底相对高度：</td>
                  <td >{{digitProjectBuild.zxjdxdgd}}</td>
                </tr>
                <tr >
                  <td class="column">最大基底相对高度：</td>
                  <td >{{digitProjectBuild.zdjdxdgd}}</td>
                  <td class="column">最小基底绝对高度：</td>
                  <td >{{digitProjectBuild.zxjdjdgd}}</td>
                  <td class="column">最大基底绝对高度：</td>
                  <td >{{digitProjectBuild.zdjdjdgd}}</td>
                </tr>
                <tr >
                  <td class="column">+0绝对标高：</td>
                  <td >{{digitProjectBuild.jdbg}}</td>
                  <td class="column">外墙形式：</td>
                  <td >{{digitProjectBuild.wqxs}}</td>
                  <td class="column">屋顶形式：</td>
                  <td >{{digitProjectBuild.wdxs}}</td>
                </tr>
                <tr >
                  <td class="column">箱式电梯数：</td>
                  <td >{{digitProjectBuild.xsdts}}</td>
                  <td class="column">跨层扶梯数：</td>
                  <td >{{digitProjectBuild.kcfts}}</td>
                </tr>
              </table>
              <!-- 管线工程类型： -->
              <table class="mailTable" v-if="ProjectPipelineFlag">
                <tr>
                  <thead>专业信息</thead>
                </tr>
                <tr >
                  <td class="column">管线工程类型：</td>
                  <td >{{digitProjectPipeline.gxgclx}}</td>
                  <td class="column">管线位置：</td>
                  <td >{{digitProjectPipeline.gxwz}}</td>
                  <td class="column">地形图号：</td>
                  <td >{{digitProjectPipeline.dxth}}</td>
                </tr>
                <tr >
                  <td class="column">管线工程现状：</td>
                  <td >{{digitProjectPipeline.gxgcxz}}</td>
                  <td class="column">管线埋设方式：</td>
                  <td >{{digitProjectPipeline.gxmsfs}}</td>
                  <td class="column">给排水流向：</td>
                  <td >{{digitProjectPipeline.gpslx}}</td>
                </tr>
                <tr >
                  <td class="column">管线类型：</td>
                  <td >{{digitProjectPipeline.gxlx}}</td>
                  <td class="column">管线起点：</td>
                  <td >{{digitProjectPipeline.gxqd}}</td>
                  <td class="column">管线止点：</td>
                  <td >{{digitProjectPipeline.gxzd}}</td>
                </tr>
                <tr >
                  <td class="column">管线等级：</td>
                  <td >{{digitProjectPipeline.gxdj}}</td>
                  <td class="column">起点埋深：</td>
                  <td >{{digitProjectPipeline.qdms}}</td>
                  <td class="column">止点埋深：</td>
                  <td >{{digitProjectPipeline.zdms}}</td>
                </tr>
                <tr >
                  <td class="column">设计埋设年限：</td>
                  <td >{{digitProjectPipeline.sjmsnx}}</td>
                  <td class="column">长度：</td>
                  <td >{{digitProjectPipeline.cd}}</td>
                  <td class="column">规格：</td>
                  <td >{{digitProjectPipeline.gg}}</td>
                </tr>
                <tr >
                  <td class="column">材质：</td>
                  <td >{{digitProjectPipeline.cz}}</td>
                  <td class="column">材质年限：</td>
                  <td >{{digitProjectPipeline.cznx}}</td>
                  <td class="column">井总数：</td>
                  <td >{{digitProjectPipeline.jzs}}</td>
                </tr>
                <tr >
                  <td class="column">井盖形状：</td>
                  <td >{{digitProjectPipeline.jgxz}}</td>
                  <td class="column">井盖尺寸：</td>
                  <td >{{digitProjectPipeline.jgcc}}</td>
                  <td class="column">平均井间距离：</td>
                  <td >{{digitProjectPipeline.pjjjjl}}</td>
                </tr>
                <tr >
                  <td class="column">设计压力：</td>
                  <td >{{digitProjectPipeline.sjyl}}</td>
                  <td class="column">载荷：</td>
                  <td >{{digitProjectPipeline.zh}}</td>
                  <td class="column">总孔数：</td>
                  <td >{{digitProjectPipeline.zks}}</td>
                </tr>
                <tr >
                  <td class="column">已用孔数：</td>
                  <td >{{digitProjectPipeline.yyks}}</td>
                  <td class="column">探测日期：</td>
                  <td >{{digitProjectPipeline.tcrq}}</td>
                  <td class="column">所在位置：</td>
                  <td >{{digitProjectPipeline.szwz}}</td>
                </tr>
                <tr >
                  <td class="column">测量单位：</td>
                  <td >{{digitProjectPipeline.cldw}}</td>
                  <td class="column">权属单位：</td>
                  <td >{{digitProjectPipeline.qsdw}}</td>
                  <td class="column">维护单位：</td>
                  <td >{{digitProjectPipeline.whdw}}</td>
                </tr>
                <tr >
                  <td class="column">断面形式：</td>
                  <td colspan="5">{{digitProjectPipeline.dmxs}}</td>
                </tr>
              </table>
              <!-- 道路工程类型： -->
              <table class="mailTable" v-if="ProjectRoadFlag">
                <tr>
                  <thead>专业信息</thead>
                </tr>
                <tr >
                  <td class="column">道路工程类型：</td>
                  <td >{{digitProjectRoad.dlgclxName}}</td>
                  <td class="column">路面种类：</td>
                  <td >{{digitProjectRoad.lmzlName}}</td>
                </tr>
                <tr >
                  <td class="column">车道数：</td>
                  <td >{{digitProjectRoad.cds}}</td>
                  <td class="column">设计车速：</td>
                  <td >{{digitProjectRoad.sjcs}}</td>
                </tr>
                <tr >
                  <td class="column">荷载：</td>
                  <td >{{digitProjectRoad.hz}}</td>
                  <td class="column">起点里程：</td>
                  <td >{{digitProjectRoad.qdlc}}</td>
                </tr>
                <tr >
                  <td class="column">讫点里程：</td>
                  <td >{{digitProjectRoad.qidlc}}</td>
                  <td class="column">道路长度：</td>
                  <td >{{digitProjectRoad.dlcd}}</td>
                </tr>
                <tr >
                  <td class="column">路基类型：</td>
                  <td >{{digitProjectRoad.ljlxName}}</td>
                  <td class="column">路基材质：</td>
                  <td >{{digitProjectRoad.ljczName}}</td>
                </tr>
                <tr >
                  <td class="column">地基持力层岩层类型：</td>
                  <td >{{digitProjectRoad.djclcyclx}}</td>
                  <td class="column">地基持力层承载力：</td>
                  <td >{{digitProjectRoad.djclcczl}}</td>
                </tr>
                <tr >
                  <td class="column">路面材质：</td>
                  <td >{{digitProjectRoad.lmczName}}</td>
                  <td class="column">路面材质年限：</td>
                  <td >{{digitProjectRoad.lmcznx}}</td>
                </tr>
                <tr >
                  <td class="column">最大纵坡：</td>
                  <td >{{digitProjectRoad.zdzp}}</td>
                  <td class="column">最小纵坡：</td>
                  <td >{{digitProjectRoad.zxzp}}</td>
                </tr>
                <tr >
                  <td class="column">道路宽度：</td>
                  <td >{{digitProjectRoad.dlkd}}</td>
                  <td class="column">幅宽：</td>
                  <td >{{digitProjectRoad.fk}}</td>
                </tr>
                <tr >
                  <td class="column">路面设计使用年限：</td>
                  <td colspan="5">{{digitProjectRoad.lmsjsynx}}</td>
                </tr>
              </table>
             <!-- 隧道工程类型： -->
             <table class="mailTable" v-if="ProjectTunnelFlag">
                <tr>
                  <thead>专业信息</thead>
                </tr>
                <tr >
                  <td class="column">隧道工程类型：</td>
                  <td >{{digitProjectTunnel.sdgclx}}</td>
                  <td class="column">围岩级别：</td>
                  <td >{{digitProjectTunnel.wyjb}}</td>
                  <td class="column">隧道功能用途：</td>
                  <td >{{digitProjectTunnel.sdgnyt}}</td>
                </tr>
                <tr >
                  <td class="column">隧道长度等级：</td>
                  <td >{{digitProjectTunnel.sdcddj}}</td>
                  <td class="column">结构形式：</td>
                  <td >{{digitProjectTunnel.dmlx}}</td>
                  <td class="column">洞门类型：</td>
                  <td >{{digitProjectTunnel.sjcs}}</td>
                </tr>
                <tr >
                  <td class="column">横断面面积分类：</td>
                  <td >{{digitProjectTunnel.hdmmjfl}}</td>
                  <td class="column">隧道埋置深度分类：</td>
                  <td >{{digitProjectTunnel.sdmzsdfl}}</td>
                  <td class="column">横断面面积：</td>
                  <td >{{digitProjectTunnel.hdmmj}}</td>
                </tr>
                <tr >
                  <td class="column">隧道所处地质条件：</td>
                  <td >{{digitProjectTunnel.sdscdztj}}</td>
                  <td class="column">隧道长度：</td>
                  <td >{{digitProjectTunnel.sdcd}}</td>
                  <td class="column">路（轨）面以上净空面积：</td>
                  <td >{{digitProjectTunnel.lmysjkmj}}</td>
                </tr>
                <tr >
                  <td class="column">轨道交通类型：</td>
                  <td >{{digitProjectTunnel.gdjtlx}}</td>
                  <td class="column">轨道运营性质：</td>
                  <td >{{digitProjectTunnel.gdyyxz}}</td>
                  <td class="column">轨道运营速度分类：</td>
                  <td >{{digitProjectTunnel.gdyysdfl}}</td>
                </tr>
                <tr >
                  <td class="column">轨道荷载：</td>
                  <td >{{digitProjectTunnel.gdhz}}</td>
                  <td class="column">轨道运行方式：</td>
                  <td >{{digitProjectTunnel.gdyxfs}}</td>
                  <td class="column">设计列车速度：</td>
                  <td >{{digitProjectTunnel.sjlcsd}}</td>
                </tr>
                <tr >
                  <td class="column">轨道长度：</td>
                  <td >{{digitProjectTunnel.gdcd}}</td>
                  <td class="column">车站名：</td>
                  <td >{{digitProjectTunnel.czm}}</td>
                  <td class="column">轨道地基持力层承载力：</td>
                  <td >{{digitProjectTunnel.gddjclcczl}}</td>
                </tr>
                <tr >
                  <td class="column">轨道起点里程：</td>
                  <td >{{digitProjectTunnel.gdqdlc}}</td>
                  <td class="column">轨道讫点里程：</td>
                  <td >{{digitProjectTunnel.gdqidlc}}</td>
                  <td class="column">轨道基础形式：</td>
                  <td >{{digitProjectTunnel.gdjcxs}}</td>
                </tr>
                <tr >
                  <td class="column">轨道材质：</td>
                  <td >{{digitProjectTunnel.gdcz}}</td>
                  <td class="column">轨道材质年限：</td>
                  <td >{{digitProjectTunnel.gdcznx}}</td>
                  <td class="column">轨道最小纵坡：</td>
                  <td >{{digitProjectTunnel.gdzxzp}}</td>
                </tr>
                <tr >
                  <td class="column">轨道最大纵坡：</td>
                  <td >{{digitProjectTunnel.gdzdzp}}</td>
                  <td class="column">轨道幅宽：</td>
                  <td >{{digitProjectTunnel.gdfk}}</td>
                  <td class="column">轨道地基持力层岩层类型：</td>
                  <td >{{digitProjectTunnel.gddjclcyclx}}</td>
                </tr>
                <tr >
                  <td class="column">道路工程类型：</td>
                  <td >{{digitProjectTunnel.dlgclx}}</td>
                  <td class="column">路面种类：</td>
                  <td >{{digitProjectTunnel.lmzl}}</td>
                  <td class="column">道路等级：</td>
                  <td >{{digitProjectTunnel.dldj}}</td>
                </tr>
                <tr >
                  <td class="column">车道数：</td>
                  <td >{{digitProjectTunnel.cds}}</td>
                  <td class="column">设计车速：</td>
                  <td >{{digitProjectTunnel.sjcs}}</td>
                  <td class="column">道路荷载：</td>
                  <td >{{digitProjectTunnel.dlhz}}</td>
                </tr>
                <tr >
                  <td class="column">道路起点里程：</td>
                  <td >{{digitProjectTunnel.dlqdlc}}</td>
                  <td class="column">道路讫点里程：</td>
                  <td >{{digitProjectTunnel.dlqidlc}}</td>
                  <td class="column">道路长度：</td>
                  <td >{{digitProjectTunnel.dlcd}}</td>
                </tr>
                <tr >
                  <td class="column">路基类型：</td>
                  <td >{{digitProjectTunnel.ljlx}}</td>
                  <td class="column">路基材质：</td>
                  <td >{{digitProjectTunnel.ljcz}}</td>
                  <td class="column">道路地基持力层岩层类型：</td>
                  <td >{{digitProjectTunnel.dldjclcyclx}}</td>
                </tr>
                <tr >
                  <td class="column">道路地基持力层承载力：</td>
                  <td >{{digitProjectTunnel.dldjclcczl}}</td>
                  <td class="column">路面材质：</td>
                  <td >{{digitProjectTunnel.lmcz}}</td>
                  <td class="column">路面材质年限：</td>
                  <td >{{digitProjectTunnel.lmcznx}}</td>
                </tr>
                <tr >
                  <td class="column">道路最大纵坡：</td>
                  <td >{{digitProjectTunnel.dlzdzp}}</td>
                  <td class="column">道路最小纵坡：</td>
                  <td >{{digitProjectTunnel.dlzxzp}}</td>
                  <td class="column">路面宽度：</td>
                  <td >{{digitProjectTunnel.lmkd}}</td>
                </tr>
                <tr >
                  <td class="column">道路幅宽：</td>
                  <td >{{digitProjectTunnel.dlfk}}</td>
                  <td class="column">路面设计使用年限：</td>
                  <td >{{digitProjectTunnel.lmsjsynx}}</td>
                </tr>
              </table>
             <!-- 轨道交通类型： -->
             <table class="mailTable" v-if="ProjectTrackLFlag">
                <tr>
                  <thead>专业信息</thead>
                </tr>
                <tr >
                  <td class="column">轨道交通类型：</td>
                  <td >{{digitProjectTrack.gdjtlx}}</td>
                  <td class="column">轨道运营性质：</td>
                  <td >{{digitProjectTrack.gdyyxz}}</td>
                  <td class="column">轨道运行方式：</td>
                  <td >{{digitProjectTrack.gdyxfs}}</td>
                </tr>
                <tr >
                  <td class="column">设计列车速度：</td>
                  <td >{{digitProjectTrack.sjlcsd}}</td>
                  <td class="column">轨道荷载：</td>
                  <td >{{digitProjectTrack.gdhz}}</td>
                  <td class="column">轨道运营速度分类：</td>
                  <td >{{digitProjectTrack.gdyysdfl}}</td>
                </tr>
                <tr >
                  <td class="column">轨道起点里程：</td>
                  <td >{{digitProjectTrack.gdqdlc}}</td>
                  <td class="column">轨道讫点里程：</td>
                  <td >{{digitProjectTrack.gdqidlc}}</td>
                  <td class="column">轨道长度：</td>
                  <td >{{digitProjectTrack.gdcd}}</td>
                </tr>
                <tr >
                  <td class="column">轨道材质：</td>
                  <td >{{digitProjectTrack.gdcz}}</td>
                  <td class="column">轨道材质年限：</td>
                  <td >{{digitProjectTrack.gdcznx}}</td>
                  <td class="column">轨道基础形式：</td>
                  <td >{{digitProjectTrack.gdjcxs}}</td>
                </tr>
                <tr >
                  <td class="column">轨道最大纵坡：</td>
                  <td >{{digitProjectTrack.gdzdzp}}</td>
                  <td class="column">轨道幅宽：</td>
                  <td >{{digitProjectTrack.gdfk}}</td>
                  <td class="column">轨道最小纵坡：</td>
                  <td >{{digitProjectTrack.gdzxzp}}</td>
                </tr>
                <tr >
                  <td class="column">地基持力层承载力：</td>
                  <td >{{digitProjectTrack.djclcczl}}</td>
                  <td class="column">地基持力层岩层类型：</td>
                  <td >{{digitProjectTrack.djclcyclx}}</td>
                  <td class="column">车站名：</td>
                  <td >{{digitProjectTrack.czm}}</td>
                </tr>
              </table>
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
        <td class="column">移交单位：</td>
        <td colspan="3">{{projectdetails.yjdw}}</td>
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
  getMachineUtilizeEngineeringListSide,
  downloadFileMachineUtilizationUtilize,
  getMachineUtilizeProjectListEngineeringId,
  getMachineUtilizeProjectListProjectId,
  getMachineUtilizeProjectListfilesId,
  getWebDataDictionaryBistDrop,
  getMachineUtilizeIntegratedMachineRecordList,
  getDictListDictTag,
  getWebFileTypeListDrop,
    getWebSearchFilePosition,
  getWebUtilizationFileCount,
  searchProjectRoadList, // 获取道路工程专业信息
  searchProjectTunnelList, // 获取隧道工程专业信息
  searchProjectTrackList,  // 获取轨道工程专业信息
  searchProjectPipelineList, // 获取管线工程专业信息
  searchProjectBridgeList, // 获取桥涵工程专业信息
  searchProjectBuildList, // 获取建筑工程专业信息
} from '@/api/machine'
// import {
//   searchProjectRoadList, // 获取道路工程专业信息
//   searchProjectTunnelList, // 获取隧道工程专业信息
//   searchProjectTrackList,  // 获取轨道工程专业信息
//   searchProjectPipelineList, // 获取管线工程专业信息
//   searchProjectBridgeList, // 获取桥涵工程专业信息
//   searchProjectBuildList, // 获取建筑工程专业信息
//   searchProjectProjectId
// } from '@/api/RecorSearch/recorsearch'

export default {
  name: 'specialtyDetails',
  props: {
    projectdata:{
      type: Object,
      default: ''
    },
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
      digitProjectBuild:{},//专业信息——建筑工程
      digitProjectPipeline:{},//专业信息——管道工程
      digitProjectRoad:{},//专业信息——道路工程
      digitProjectTrack:{},//专业信息——轨道交通工程
      digitProjectTunnel:{},//专业信息——隧道
      zyxinxi:'',//专业信息 判断字段
      digitProjectBridge:[],//桥涵工程
      digitProjectBuild:[],//建筑工程
      digitProjectPipeline:[],//管线工程
      digitProjectRoad:[],//道路工程
      digitProjectTunnel:[],//隧道工程
      digitProjectTrack:[],//轨道交通工程
      // 专业信息 详情 是否显示条件
      ProjectBridgeFlag:false,
      ProjectBuildFlag:false,
      ProjectPipelineFlag:false,
      ProjectRoadFlag:false,
      ProjectTunnelFlag:false,
      ProjectTrackLFlag:false,


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
    },
    projectdata:{
      immediate:true,
      deep: true,
      handler(newVal, oldVal) {
        this.projectdata = newVal
        
      }
    }
  },
  created() {
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
     setTimeout(() => {
        this.dialogprojectdetailsVisibleFun()
      }, 1000)
    
  },
  methods: {
    //归档信息
    GetUtilizationFileCountFun(){
      const q ={
        project_id:this.project_id
      }
      getWebUtilizationFileCount(q).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         
         this.FileCount = res
        }
      })
    },
      //单位工程详情
    dialogprojectdetailsVisibleFun(){
      
      
      if (this.zt == 'file_status5') {
        this.zt
      } else {
        
      }
      const q = {
        project_id:this.project_id,
        zt:this.zt
      }
     
        this.dialogprojectdetailsVisible = true
        let res = this.projectdata
        console.log(this.archivesCateList)
        let resdata = JSON.parse(JSON.stringify(this.archivesCateList));  
        resdata.forEach(item =>{
          if (res.dwgclx == item.type_code) {
            res.dwgclxName = item.type_name
          }

        })
        let storagePeriod = JSON.parse(JSON.stringify(this.storagePeriod));  
        console.log(storagePeriod)
        storagePeriod.forEach(item =>{
          if (res.bgqx == item.bm) {
            res.bgqxName = item.mc
          }
        })
        this.projectdetails = res
        let secretGrade = JSON.parse(JSON.stringify(this.secretGrade));  
        console.log(secretGrade)
        secretGrade.forEach(item =>{
          if (res.mj == item.bm) {
            res.mjName = item.mc
          }
        })
        if (res.dwgclx.substr(0,res.dwgclx.indexOf('.')) === 'E2') {
          console.log("桥涵工程")
          const q = {
            project_id:this.project_id,
            zt:'file_status3'
          }
          searchProjectBridgeList(q).then(response =>{
            if (response.status === 200) {
            const { data: res, message, status } = response.data
            if (status !== 200) return this.message({ message: message, type: 'error' })
            
            this.digitProjectBridge = res
            this.ProjectBridgeFlag = true
            this.loading = false
            }
          })
        } else if (res.dwgclx.charAt(0) === 'I') {
          console.log("建筑工程")
          const q = {
            project_id:this.project_id,
            zt:this.zt
          }
          searchProjectBuildList(q).then(response =>{
            if (response.status === 200) {
            const { data: res, message, status } = response.data
            if (status !== 200) return this.message({ message: message, type: 'error' })
            
            this.ProjectBuildFlag = true
            this.digitProjectBuild = res
            this.loading = false
            }
          })
          
        } else if (res.dwgclx.charAt(0) === 'Q') {
          console.log("管线工程")
          const q = {
            project_id:this.project_id,
            zt:this.zt
          }
          searchProjectPipelineList(q).then(response =>{
            if (response.status === 200) {
            const { data: res, message, status } = response.data
            if (status !== 200) return this.message({ message: message, type: 'error' })
            
            if (res == null) {
              this.ProjectPipelineFlag = false
              this.loading = false
            }else {
              this.ProjectPipelineFlag = true
              this.digitProjectPipeline = {}
            }
           
            }
          })
        } else if (res.dwgclx.substr(0,res.dwgclx.indexOf('.')) === 'E1') {
          console.log("道路工程")
          const q = {
            project_id:this.project_id,
            zt:this.zt
          }
          searchProjectRoadList(q).then(response =>{
            if (response.status === 200) {
            const { data: res, message, status } = response.data
            if (status !== 200) return this.message({ message: message, type: 'error' })
              
              if (res == null) {
                this.ProjectRoadFlag = false
                this.loading = false
              }else {
                this.ProjectRoadFlag = true
                this.digitProjectRoad = {}
              }
            }
          })
        } else if (res.dwgclx.substr(0,res.dwgclx.indexOf('.')) === 'E4') {
          console.log("隧道工程")
          const q = {
            project_id:this.project_id,
            zt:this.zt
          }
          searchProjectTunnelList(q).then(response =>{
            if (response.status === 200) {
            const { data: res, message, status } = response.data
            if (status !== 200) return this.message({ message: message, type: 'error' })
              
              if (res == null) {
                this.ProjectTunnelFlag = false
                this.loading = false
              }else {
                this.ProjectTunnelFlag = true
                this.digitProjectTunnel = {}
              }
            }
          })
        } else if (res.dwgclx.charAt(0) === 'G') {
          console.log("轨道交通工程")
          const q = {
            project_id:this.project_id,
            zt:this.zt
          }
          searchProjectTunnelList(q).then(response =>{
            
            if (response.status === 200) {
            const { data: res, message, status } = response.data
            if (status !== 200) return this.message({ message: message, type: 'error' })
              
              if (res == null) {
                this.ProjectTrackLFlag = false
                this.loading = false
              }else {
                this.ProjectTrackLFlag = true
                this.digitProjectTrack = {}
              }
            }
          })
        } else {
          this.loading = false
        }


        return

        this.projectdetails = res.digitProject
        this.digitProjectBridge = res.digitProjectBridge
        this.digitProjectBuild = res.digitProjectBuild
        this.digitProjectPipeline = res.digitProjectPipeline
        if (res.digitProjectRoad !== null) {
        let pavementMaterial = JSON.parse(JSON.stringify(this.pavementMaterial));
        pavementMaterial.map(item =>{
            if (res.digitProjectRoad.lmcz == item.bm) {
            res.digitProjectRoad.lmczName = item.mc
          
          }
        })

        let subgradeMaterial = JSON.parse(JSON.stringify(this.subgradeMaterial));
        subgradeMaterial.map(item =>{
          if (res.digitProjectRoad.ljcz == item.bm) {
            res.digitProjectRoad.ljczName = item.mc
          }
        })

        let subgradeType = JSON.parse(JSON.stringify(this.subgradeType));
        subgradeType.map(item =>{
          if (res.digitProjectRoad.ljlx == item.bm) {
            res.digitProjectRoad.ljlxName = item.mc
          }
        })

        let pavementType = JSON.parse(JSON.stringify(this.pavementType));
        pavementType.map(item =>{
          if (res.digitProjectRoad.lmzl == item.bm) {
            res.digitProjectRoad.lmzlName = item.mc
          }
        })

        let roadType = JSON.parse(JSON.stringify(this.roadType));
        roadType.map(item =>{
          if (res.digitProjectRoad.dlgclx == item.bm) {
            res.digitProjectRoad.dlgclxName = item.mc
          }
        })
        }
  

        this.digitProjectRoad = res.digitProjectRoad
        this.digitProjectTrack = res.digitProjectTrack
        this.digitProjectTunnel = res.digitProjectTunnel
        this.loading = false
    },
    getProjectProfeInfoFun() {
      this.professionalInfoForm = {}
      if (this.projectName === '道路工程') {
        this.searchProjectRoadListFun(this.projectId)
      } else if (this.projectName === '隧道工程') {
        this.searchProjectTunnelListFun(this.projectId)
      } else if (this.projectName === '建筑工程') {
        this.searchProjectBuildListFun(this.projectId)
      } else if (this.projectName === '轨道交通工程') {
        this.searchProjectTrackListFun(this.projectId)
      } else if (this.projectName === '管线工程') {
        this.searchProjectPipelineListFun(this.projectId)
      } else if (this.projectName === '桥涵工程') {
        this.searchProjectBridgeListFun(this.projectId)
      }
    },

    // 取消
    cancel() {
      this.professionalInfoForm = {}
      this.$emit('cancel')
    },


   // 保管期限
    getStoragePeriod() {
      const q = {
        bm: "BGQX_DIC"
      }
      getWebDataDictionaryBistDrop(q).then(response => {
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
      getWebDataDictionaryBistDrop(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.secretGrade  = res
        }
      }).catch(error => {
        console.log(error)
      })
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
    // 单位工程类型
    getUniProjectType() {
      getWebFileTypeListDrop().then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.saveArchivesCateAll(res)
          
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
    searchProjectRoadListFun(pid) {
      const q = {
        project_id: pid
      }
      searchProjectRoadList(q).then(response => {
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
    searchProjectTunnelListFun(pid) {
      const q = {
        project_id: pid
      }
      searchProjectTunnelList(q).then(response => {
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
    searchProjectBuildListFun(pid) {
      const q = {
        project_id: pid
      }
      searchProjectBuildList(q).then(response => {
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
    searchProjectTrackListFun(pid) {
      const q = {
        project_id: pid
      }
      searchProjectTrackList(q).then(response => {
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
    searchProjectPipelineListFun(pid) {
      const q = {
        project_id: pid
      }
      searchProjectPipelineList(q).then(response => {
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
    searchProjectBridgeListFun(pid) {
      const q = {
        project_id: pid
      }
      searchProjectBridgeList(q).then(response => {
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
      getWebDataDictionaryBistDrop(q).then(response => {
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
      getWebDataDictionaryBistDrop(q).then(response => {
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
      getWebDataDictionaryBistDrop(q).then(response => {
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
      getWebDataDictionaryBistDrop(q).then(response => {
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
      getWebDataDictionaryBistDrop(q).then(response => {
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
      getWebDataDictionaryBistDrop(q).then(response => {
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
      getWebDataDictionaryBistDrop(q).then(response => {
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
      getWebDataDictionaryBistDrop(q).then(response => {
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
      getWebDataDictionaryBistDrop(q).then(response => {
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
      getWebDataDictionaryBistDrop(q).then(response => {
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
      getWebDataDictionaryBistDrop(q).then(response => {
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
      getWebDataDictionaryBistDrop(q).then(response => {
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
      getWebDataDictionaryBistDrop(q).then(response => {
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
      getWebDataDictionaryBistDrop(q).then(response => {
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
      getWebDataDictionaryBistDrop(q).then(response => {
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
      getWebDataDictionaryBistDrop(q).then(response => {
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
      getWebDataDictionaryBistDrop(q).then(response => {
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
      getWebDataDictionaryBistDrop(q).then(response => {
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
      getWebDataDictionaryBistDrop(q).then(response => {
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
      getWebDataDictionaryBistDrop(q).then(response => {
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
      getWebDataDictionaryBistDrop(q).then(response => {
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
      getWebDataDictionaryBistDrop(q).then(response => {
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
      getWebDataDictionaryBistDrop(q).then(response => {
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
      getWebDataDictionaryBistDrop(q).then(response => {
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
      getWebDataDictionaryBistDrop(q).then(response => {
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
      getWebDataDictionaryBistDrop(q).then(response => {
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
      getWebDataDictionaryBistDrop(q).then(response => {
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
      getWebDataDictionaryBistDrop(q).then(response => {
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
      getWebDataDictionaryBistDrop(q).then(response => {
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
      getWebDataDictionaryBistDrop(q).then(response => {
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
      getWebDataDictionaryBistDrop(q).then(response => {
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
      getWebDataDictionaryBistDrop(q).then(response => {
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
      getWebDataDictionaryBistDrop(q).then(response => {
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
      getWebDataDictionaryBistDrop(q).then(response => {
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
      getWebDataDictionaryBistDrop(q).then(response => {
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
      getWebDataDictionaryBistDrop(q).then(response => {
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
      getWebDataDictionaryBistDrop(q).then(response => {
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
      getWebDataDictionaryBistDrop(q).then(response => {
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
      getWebDataDictionaryBistDrop(q).then(response => {
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
      getWebDataDictionaryBistDrop(q).then(response => {
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
      getWebDataDictionaryBistDrop(q).then(response => {
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
      getWebDataDictionaryBistDrop(q).then(response => {
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
