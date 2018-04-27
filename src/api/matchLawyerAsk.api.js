import Ajax from 'lib/Ajax';

export default {
  findLawyer(params) {
    return Ajax({
      url: '/consult/find/lawyer',
      method: 'get',
      params: params
    });
  }
};
