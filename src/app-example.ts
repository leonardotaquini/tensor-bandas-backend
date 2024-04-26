import tf from '@tensorflow/tfjs';


 // Tidy to auto-clean all these tensors
 tf.tidy(() => {
    const users = ['Leonardo']
    const bands = [
      'Nirvana',
      'Nine Inch Nails',
      'Backstreet Boys',
      'N Sync',
      'Night Club',
      'Apashe',
      'STP',
    ]
    const features = [
      'Grunge',
      'Rock',
      'Industrial',
      'Boy Band',
      'Dance',
      'Techno',
    ]

    // User votes <4>
    const user_votes = tf.tensor([
      [10, 9, 1, 1, 8, 7, 8],
    ])

    // Music Styles <5>
    const band_feats = tf.tensor([
      [1, 1, 0, 0, 0, 0],
      [1, 0, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 0],
      [0, 0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0, 1],
      [0, 0, 1, 0, 0, 1],
      [1, 1, 0, 0, 0, 0],
    ])

    // User's favorite styles
    const user_feats = tf.matMul(user_votes, band_feats)
    // Print the answers
    user_feats.print()

    // Let's make them pretty
    const top_user_features = tf.topk(user_feats, features.length)
   
    // Back to JavaScript
    const top_genres = top_user_features.indices.arraySync()
    console.log(top_genres)
    // print the results
    users.map((u, i) => {
      const rankedCategories = top_genres&&[i].map((v) => features[v])
      console.log(u, rankedCategories)
    })
  })
  