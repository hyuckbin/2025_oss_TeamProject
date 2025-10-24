// src/components/ProductMap.jsx

import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';

// window 객체에서 kakao 네임스페이스를 가져옵니다.
const { kakao } = window;

function ProductMap({ locationName }) {

  useEffect(() => {
    // kakao 객체나 maps API가 로드되지 않았다면 함수를 종료합니다.
    if (!kakao || !kakao.maps || !kakao.maps.services) {
      console.error("Kakao Maps 스크립트가 로드되지 않았습니다.");
      return;
    }

    const mapContainer = document.getElementById('map'); // 지도를 담을 영역의 DOM 레퍼런스
    const mapOption = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567), // 기본 중심 좌표 (서울시청)
      level: 3, // 지도의 레벨(확대, 축소 정도)
    };

    // 지도를 생성합니다.
    const map = new kakao.maps.Map(mapContainer, mapOption);

    // 주소-좌표 변환 객체를 생성합니다.
    const geocoder = new kakao.maps.services.Geocoder();

    // 주소로 좌표를 검색합니다.
    geocoder.addressSearch(locationName, function (result, status) {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        // 결과값으로 받은 위치를 마커로 표시합니다.
        const marker = new kakao.maps.Marker({
          map: map,
          position: coords,
        });

        // 인포윈도우로 장소에 대한 설명을 표시합니다. (선택 사항)
        const infowindow = new kakao.maps.InfoWindow({
          content: `<div style="width:150px;text-align:center;padding:6px 0;">${locationName}</div>`,
        });
        infowindow.open(map, marker);

        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다.
        map.setCenter(coords);
      } else {
        // 주소 검색 실패 시
        console.warn(`'${locationName}' 주소 검색에 실패했습니다.`);
      }
    });
  }, [locationName]); // locationName prop이 바뀔 때마다 지도를 다시 그립니다.

  return (
    <Box>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        거래 희망 장소
      </Typography>
      {/* 지도를 표시할 div */}
      <Box
        id="map"
        sx={{
          width: '100%',
          height: '300px',
          borderRadius: 2,
          border: '1px solid #ddd',
        }}
      ></Box>
    </Box>
  );
}

export default ProductMap;